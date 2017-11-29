package com.mmall.service.impl;

import com.alipay.api.AlipayResponse;
import com.alipay.api.response.AlipayTradePrecreateResponse;
import com.alipay.demo.trade.config.Configs;
import com.alipay.demo.trade.model.ExtendParams;
import com.alipay.demo.trade.model.GoodsDetail;
import com.alipay.demo.trade.model.builder.AlipayTradePrecreateRequestBuilder;
import com.alipay.demo.trade.model.result.AlipayF2FPrecreateResult;
import com.alipay.demo.trade.service.AlipayTradeService;
import com.alipay.demo.trade.service.impl.AlipayTradeServiceImpl;
import com.alipay.demo.trade.utils.ZxingUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.mmall.common.ReturnResponse;
import com.mmall.dao.*;
import com.mmall.entity.*;
import com.mmall.service.IOrderService;
import com.mmall.utils.OrderNo;
import com.mmall.utils.QiniuUtils;
import com.mmall.utils.StatusUtil;
import com.mmall.vo.*;
import com.qiniu.common.QiniuException;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by guanxy on 2017/11/6.
 */
@Service
public class OrderServiceImpl implements IOrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private OrderItemDao itemDao;

    @Autowired
    private ShippingDao shippingDao;
    
    @Autowired
    private CartDao cartDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private PayInfoDao payInfoDao;

    /**
     * ****************************************************
     *     后台订单
     * ****************************************************
     */

    @Override
    public ReturnResponse selectOrders(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<OrderVo> orderVos = new ArrayList<>();     //创建最后返回的集合
        List<Order> orderList = orderDao.selectOrders();    //订单集合
        PageInfo pageInfo = new PageInfo(orderList);    //先将订单塞进pageInfo保证之后的对象分页功能实现
        for (Order order : orderList) {     //遍历订单分别操作
            OrderVo orderVo = new OrderVo();    //创建最后返回的订单返回类型
            BeanUtils.copyProperties(order, orderVo);   //将订单和返回订单合并
            orderVo.setStatusDesc(StatusUtil.getValue(orderVo.getStatus()));    //设置返回订单自身的字段
            orderVo.setPaymentTypeDesc("在线支付");
            orderVo.setImageHost("http://img.happymmall.com/");
            List<OrderItemVo> orderItemVos = new ArrayList<>();     //订单商品详细集合
            List<OrderItem> orderItems = itemDao.selectOrderItemByOrderNo(orderVo.getOrderNo());
            for (OrderItem item : orderItems) {
                OrderItemVo vo = new OrderItemVo();
                BeanUtils.copyProperties(item, vo);
                orderItemVos.add(vo);
            }
            orderVo.setOrderItemVoList(orderItemVos);   //将订单商品详细集合塞进返回订单
            Shipping shipping = shippingDao.selectById(orderVo.getShippingId());    //通过收货地址id查找到收货地址详细信息
            ShippingVo shippingVo = new ShippingVo();
            BeanUtils.copyProperties(shipping, shippingVo);     //收货地址返回类型返回
            orderVo.setShippingVo(shippingVo);
            orderVos.add(orderVo);
        }
        pageInfo.setList(orderVos);
        return new ReturnResponse(0, pageInfo);
    }

    @Override
    public ReturnResponse selectOrderByOrderNo(Long orderNo) {
        Order order = orderDao.selectOrderByOrderNo(orderNo);
        if (order == null) {
            return new ReturnResponse(1, "订单不存在");
        } else {
            return new ReturnResponse(0, order);
        }
    }

    @Override
    public ReturnResponse queryDetail(Long orderNo) {
        Order order = orderDao.selectOrderByOrderNo(orderNo);
        return queryUtil(order);
    }



    @Override
    public ReturnResponse sendOrder(Long orderNo) {
        Order order = orderDao.selectOrderByOrderNo(orderNo);
        if (order != null) {
            if (order.getStatus() == StatusUtil.PAY.getKey()) {
                order.setStatus(StatusUtil.SEND.getKey());
                order.setSendTime(new Date());
                orderDao.updateOrderById(order);
                return new ReturnResponse(0, "发货成功");
            }else{
                return new ReturnResponse(1,"订单状态不正确");
            }
        } else {
            return new ReturnResponse(1, "订单不存在");
        }
    }

   


    /**
     * ****************************************************
     *     前台订单
     * ****************************************************
     */


    @Override
    public ReturnResponse createOrder(Integer userId,Integer shippingId) {

        //添加订单
        Long orderNo = OrderNo.ORDER_NO();
        BigDecimal sum = new BigDecimal(0);
        List<Cart> cartList = cartDao.selectAllChecked(userId);
        for (Cart cart:cartList) {
            Product product = productDao.selectProductById(cart.getProductId());
            OrderItem item = ItemCreateByProduct(product,cart,orderNo);
            sum = sum.add(item.getTotalPrice());
            itemDao.insertOne(item);
        }
        Order order = createOrderByCart(orderNo,shippingId,userId,sum);
        orderDao.insertOne(order);
        cartDao.deleteAfterOrder(userId);

        //返回操作
        order = orderDao.selectOrderByOrderNo(orderNo);
        OrderPreVo preVo = new OrderPreVo();
        BeanUtils.copyProperties(order,preVo);
        Shipping shipping = shippingDao.selectById(shippingId);
        ShippingVo shippingVo = new ShippingVo();
        BeanUtils.copyProperties(shipping,shippingVo);
        preVo.setShippingVo(shippingVo);
        List<OrderItemVo> orderItemVos = new ArrayList<>();
        List<OrderItem> orderItems = itemDao.selectOrderItemByOrderNo(orderNo);
        for (OrderItem item : orderItems) {
            OrderItemVo vo = new OrderItemVo();
            BeanUtils.copyProperties(item, vo);
            orderItemVos.add(vo);
        }
        preVo.setOrderItemVoList(orderItemVos);
        return new ReturnResponse(0,preVo);
    }

    @Override
    public ReturnResponse selectOrderProduct(Integer userId) {
        OrderProductVo vo = new OrderProductVo();
        List<OrderItemVo> orderItemVos = new ArrayList<>();
        List<Cart> cartList = cartDao.selectAllChecked(userId);
        BigDecimal sum = new BigDecimal(0);
        for (Cart cart:cartList){
            Product product = productDao.selectProductById(cart.getProductId());
            OrderItemVo itemVo = new OrderItemVo();
            itemVo.setProductId(product.getId());
            itemVo.setProductName(product.getName());
            itemVo.setProductImage(product.getMainImage());
            itemVo.setCurrentUnitPrice(product.getPrice());
            itemVo.setQuantity(cart.getQuantity());
            itemVo.setTotalPrice(product.getPrice().multiply(new BigDecimal(cart.getQuantity())));
            itemVo.setCreateTime(new Date());
            orderItemVos.add(itemVo);
            sum = sum.add(itemVo.getTotalPrice());
        }
        vo.setOrderItemVoList(orderItemVos);
        vo.setImageHost("http://img.happymmall.com/");
        vo.setProductTotalPrice(sum);
        return new ReturnResponse(0,vo);
    }

    @Override
    public ReturnResponse selectOrdersByUserId(Integer pageNum,Integer pageSize,Integer userId) {
        PageHelper.startPage(pageNum, pageSize);
        List<OrderVo> orderVos = new ArrayList<>();     //创建最后返回的集合
        List<Order> orderList = orderDao.selectOrdersByUserId(userId);    //订单集合
        PageInfo pageInfo = new PageInfo(orderList);    //先将订单塞进pageInfo保证之后的对象分页功能实现
        for (Order order : orderList) {     //遍历订单分别操作
            OrderVo orderVo = new OrderVo();    //创建最后返回的订单返回类型
            BeanUtils.copyProperties(order, orderVo);   //将订单和返回订单合并
            orderVo.setStatusDesc(StatusUtil.getValue(orderVo.getStatus()));    //设置返回订单自身的字段
            orderVo.setPaymentTypeDesc("在线支付");
            orderVo.setImageHost("http://img.happymmall.com/");
            List<OrderItemVo> orderItemVos = new ArrayList<>();     //订单商品详细集合
            List<OrderItem> orderItems = itemDao.selectOrderItemByOrderNo(orderVo.getOrderNo());
            for (OrderItem item : orderItems) {
                OrderItemVo vo = new OrderItemVo();
                BeanUtils.copyProperties(item, vo);
                orderItemVos.add(vo);
            }
            orderVo.setOrderItemVoList(orderItemVos);   //将订单商品详细集合塞进返回订单
            Shipping shipping = shippingDao.selectById(orderVo.getShippingId());    //通过收货地址id查找到收货地址详细信息
            ShippingVo shippingVo = new ShippingVo();
            BeanUtils.copyProperties(shipping, shippingVo);     //收货地址返回类型返回
            orderVo.setShippingVo(shippingVo);
            orderVos.add(orderVo);
        }
        pageInfo.setList(orderVos);
        return new ReturnResponse(0, pageInfo);
    }

    @Override
    public ReturnResponse selectOrderByNoId(Long orderNo, Integer userId) {
        Order order = orderDao.selectOrderByNoId(orderNo, userId);
        return queryUtil(order);
    }

    @Override
    public ReturnResponse cancelOrder(Long orderNo,Integer userId) {
        Order order = orderDao.selectOrderByNoId(orderNo,userId);
        if (order != null) {
            if (order.getStatus() == StatusUtil.UNPAY.getKey()) {
                order.setStatus(StatusUtil.CANCEL.getKey());
                order.setCloseTime(new Date());
                orderDao.updateOrderById(order);
                return new ReturnResponse(0, "订单已取消");
            }else{
                return new ReturnResponse(1,"订单状态不可被取消");
            }
        } else {
            return new ReturnResponse(1, "该用户没有此订单");
        }
    }



    @Override
    public ReturnResponse pay(Long orderNo, Integer userId, String path) {
        Map<String, String> resultMap = new HashMap<>();
        Order order = orderDao.selectOrderByNoId(orderNo, userId);
        if (order == null) {
            return new ReturnResponse(1, "用户没有该订单");
        }
        resultMap.put("orderNo", String.valueOf(order.getOrderNo()));


        // (必填) 商户网站订单系统中唯一订单号，64个字符以内，只能包含字母、数字、下划线，
        // 需保证商户系统端不能重复，建议通过数据库sequence生成，
        String outTradeNo = order.getOrderNo().toString();

        // (必填) 订单标题，粗略描述用户的支付目的。如“xxx品牌xxx门店当面付扫码消费”
        String subject = new StringBuilder().append("happymmall扫码支付，订单号:").append(outTradeNo).toString();

        // (必填) 订单总金额，单位为元，不能超过1亿元
        // 如果同时传入了【打折金额】,【不可打折金额】,【订单总金额】三者,则必须满足如下条件:【订单总金额】=【打折金额】+【不可打折金额】
        String totalAmount = order.getPayment().toString();

        // (可选) 订单不可打折金额，可以配合商家平台配置折扣活动，如果酒水不参与打折，则将对应金额填写至此字段
        // 如果该值未传入,但传入了【订单总金额】,【打折金额】,则该值默认为【订单总金额】-【打折金额】
        String undiscountableAmount = "0";

        // 卖家支付宝账号ID，用于支持一个签约账号下支持打款到不同的收款账号，(打款到sellerId对应的支付宝账号)
        // 如果该字段为空，则默认为与支付宝签约的商户的PID，也就是appid对应的PID
        String sellerId = "";

        // 订单描述，可以对交易或商品进行一个详细地描述，比如填写"购买商品2件共15.00元"
        String body = new StringBuilder().append("订单").append(outTradeNo).append("购买商品共").append(totalAmount).append("元").toString();

        // 商户操作员编号，添加此参数可以为商户操作员做销售统计
        String operatorId = "test_operator_id";

        // (必填) 商户门店编号，通过门店号和商家后台可以配置精准到门店的折扣信息，详询支付宝技术支持
        String storeId = "test_store_id";

        // 业务扩展参数，目前可添加由支付宝分配的系统商编号(通过setSysServiceProviderId方法)，详情请咨询支付宝技术支持
        ExtendParams extendParams = new ExtendParams();
        extendParams.setSysServiceProviderId("2088100200300400500");

        // 支付超时，定义为120分钟
        String timeoutExpress = "120m";

        // 商品明细列表，需填写购买商品详细信息，
        List<GoodsDetail> goodsDetailList = new ArrayList<GoodsDetail>();

        List<OrderItem> orderItemList = itemDao.getByorderNoUserId(orderNo, userId);
        for (OrderItem orderItem : orderItemList) {
            GoodsDetail goods = GoodsDetail.newInstance(orderItem.getProductId().toString(), orderItem.getProductName(),
                    (orderItem.getCurrentUnitPrice().multiply(new BigDecimal(100))).longValue(), orderItem.getQuantity());
            goodsDetailList.add(goods);
        }

        // 创建扫码支付请求builder，设置请求参数
        AlipayTradePrecreateRequestBuilder builder = new AlipayTradePrecreateRequestBuilder()
                .setSubject(subject).setTotalAmount(totalAmount).setOutTradeNo(outTradeNo)
                .setUndiscountableAmount(undiscountableAmount).setSellerId(sellerId).setBody(body)
                .setOperatorId(operatorId).setStoreId(storeId).setExtendParams(extendParams)
                .setTimeoutExpress(timeoutExpress)
                .setNotifyUrl("http://106.14.153.44:8080/order/alipay_callback.do")//支付宝服务器主动通知商户服务器里指定的页面http路径,根据需要设置
                .setGoodsDetailList(goodsDetailList);


        /** 一定要在创建AlipayTradeService之前调用Configs.init()设置默认参数
         *  Configs会读取classpath下的zfbinfo.properties文件配置信息，如果找不到该文件则确认该文件是否在classpath目录
         */
        Configs.init("zfbinfo.properties");

        /** 使用Configs提供的默认参数
         *  AlipayTradeService可以使用单例或者为静态成员对象，不需要反复new
         */
        AlipayTradeService tradeService = new AlipayTradeServiceImpl.ClientBuilder().build();

        AlipayF2FPrecreateResult result = tradeService.tradePrecreate(builder);
        switch (result.getTradeStatus()) {
            case SUCCESS:
                logger.info("支付宝预下单成功: )");

                AlipayTradePrecreateResponse response = result.getResponse();
                dumpResponse(response);

                File folder = new File(path);
                if (folder.exists()) {
                    folder.setWritable(true);
                    folder.mkdirs();
                }

                // 保存本地
                String qrPath = String.format(path + "/qr-%s.png", response.getOutTradeNo());
                String qrFileName = String.format("qr-%s.png", response.getOutTradeNo());
                String qrLoad = "/usr/local/tomcat/webapps/upload/"+qrFileName;   //二维码存放路径
                //String qrLoad = "C:/apache-tomcat-7.0.72/webapps/upload/"+qrFileName;
                ZxingUtils.getQRCodeImge(response.getQrCode(), 256, qrLoad);

                File targetFile = new File(path, qrFileName);
                //上传到服务器
                //String qrUrl ="http://ggg.s1.natapp.cc/qr/"+qrFileName;     //二维码在网站显示路径
                //String qrUrl ="http://localhost:8099/qr/"+qrFileName;
                String qrUrl = null;
                String qrU = null;
                try {
                    qrUrl = QiniuUtils.upload(qrLoad);
                    qrU = "http://oz6kt5jqd.bkt.clouddn.com/"+qrUrl;
                } catch (QiniuException e) {
                    e.printStackTrace();
                }
                logger.info("qrPath:" + qrPath);
                resultMap.put("qrUrl", qrU);
                return new ReturnResponse(0, resultMap);

            case FAILED:
                logger.error("支付宝预下单失败!!!");
                return new ReturnResponse(1, "支付宝预下单失败!!!");
            case UNKNOWN:
                logger.error("系统异常，预下单状态未知!!!");
                return new ReturnResponse(1, "系统异常，预下单状态未知!!!");
            default:
                logger.error("不支持的交易状态，交易返回异常!!!");
                return new ReturnResponse(1, "不支持的交易状态，交易返回异常!!!");
        }
    }

        // 简单打印应答
    private void dumpResponse(AlipayResponse response) {
        if (response != null) {
            logger.info(String.format("code:%s, msg:%s", response.getCode(), response.getMsg()));
            if (StringUtils.isNotEmpty(response.getSubCode())) {
                logger.info(String.format("subCode:%s, subMsg:%s", response.getSubCode(),
                        response.getSubMsg()));
            }
            logger.info("body:" + response.getBody());
        }
    }


    public ReturnResponse aliCallback(Map<String,String> params){
        Long orderNo = Long.parseLong(params.get("out_trade_no"));
        String tradeNo = params.get("trade_no");
        String tradeStatus = params.get("trade_status");
        Order order = orderDao.selectOrderByOrderNo(orderNo);
        if(order==null){
            return new ReturnResponse(1,"非商城订单，回调忽略");
        }
        if(order.getStatus()>=StatusUtil.PAY.getKey()){
            return new ReturnResponse(1,"支付宝重复调用");
        }
        if(StatusUtil.AlipayCallback.TRADE_STATUS_TRADE_SUCCESS.equals(tradeStatus)){
            // 缺时间需处理 ！！！！！！！！！！！！！！！！！！！
            order.setStatus(StatusUtil.PAY.getKey());
            orderDao.updateOrderById(order);
        }

        PayInfo payInfo = new PayInfo();
        payInfo.setUserId(order.getUserId());
        payInfo.setOrderNo(order.getOrderNo());
        payInfo.setPayPlatform(1);
        payInfo.setPlatformNumber(tradeNo);
        payInfo.setPlatformStatus(tradeStatus);

        payInfoDao.insert(payInfo);

        return new ReturnResponse(0,"成功");

    }

    public ReturnResponse queryOrderPayStatus(Integer userId,Long orderNo){
        Order order = orderDao.selectOrderByNoId(orderNo, userId);
        if(order == null){
            return new ReturnResponse(1,"没有该订单");
        }
        if(order.getStatus()>=StatusUtil.PAY.getKey()){
            return new ReturnResponse(0);
        }
        return new ReturnResponse(1,"等待付款");
    }







    private Order createOrderByCart(Long orderNo,Integer shippingId,Integer userId,BigDecimal sum){
        Order order = new Order();
        order.setOrderNo(orderNo);
        order.setUserId(userId);
        order.setShippingId(shippingId);
        order.setPayment(sum);
        order.setPaymentType(1);
        order.setStatus(10);
        return order;
    }

    private OrderItem ItemCreateByProduct(Product product,Cart cart,Long orderNo){
        OrderItem item = new OrderItem();
        item.setUserId(cart.getUserId());
        item.setOrderNo(orderNo);
        item.setProductId(product.getId());
        item.setProductName(product.getName());
        item.setProductImage(product.getMainImage());
        item.setCurrentUnitPrice(product.getPrice());
        item.setQuantity(cart.getQuantity());
        item.setTotalPrice(product.getPrice().multiply(new BigDecimal(cart.getQuantity())));
        return item;
    }


    private ReturnResponse queryUtil(Order order){
        if (order == null) {
            return new ReturnResponse(1, "订单不存在");
        } else {
            OrderVo orderVo = new OrderVo();
            BeanUtils.copyProperties(order, orderVo);
            orderVo.setStatusDesc(StatusUtil.getValue(orderVo.getStatus()));
            orderVo.setPaymentTypeDesc("在线支付");
            orderVo.setImageHost("http://img.happymmall.com/");
            List<OrderItemVo> orderItemVos = new ArrayList<>();
            List<OrderItem> orderItems = itemDao.selectOrderItemByOrderNo(orderVo.getOrderNo());
            for (OrderItem item : orderItems) {
                OrderItemVo vo = new OrderItemVo();
                BeanUtils.copyProperties(item, vo);
                orderItemVos.add(vo);
            }
            orderVo.setOrderItemVoList(orderItemVos);
            Shipping shipping = shippingDao.selectById(orderVo.getShippingId());
            ShippingVo shippingVo = new ShippingVo();
            BeanUtils.copyProperties(shipping, shippingVo);
            orderVo.setShippingVo(shippingVo);
            return new ReturnResponse(0, orderVo);
        }
    }




}
