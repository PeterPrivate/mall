





-----------------------JDK自带的注释：---------------

@Override //表示覆盖或重写父类的方法

@Deprecated //表示该方法已经过时了（当方法或者类上面有@Deprecated注释是，说明该方法或是类都已经过时不能再使用。）

@SuppressWarnings //表示忽略指定警告
------------------------JDK自带的注释：----------------

------------------------spring中的注解----------------- 

映入了组件自动扫描机制

@Autowired //（将成员变量自动注入进来）
//对成员变量、方法、构造函数进行注入，来自动完成装配的工作。在spring初始化userMapperImpl这个bean时，自动装配userDao这个属性

@Service//用于标注业务层组件（如service中的UserServiceImpl）（spring）

@Controller//用于标注控制层组件（如Conroller中的UserConroller）（spring）

@Repository//用于标注数据访问组件，即DAO组件（spring）

@Transactional//声明这个service所有方法需要事务管理

---------------------------end--------------------------------

------------Lombok用法-------------

@Data：//注解在类上 可以自动提供构造方法、get/set、toString方法

------------Lombok用法-end------------


-------------hibernat--------------

@Entity //声明该类为实体化类 一个类声明为实体Bean,

@Id //注解可将实体Bean中某个属性定义为主键
 
@GeneratedValue(strategy = GenerationType.IDENTITY)//使用@GenerateValue注解可以定义该标识符的生成策略

@Column(name="数据库表中的字段名" )//注解将属性映射到列

@NotNull(message = "提示信息")//注解的属性表示不能为空

@Min(value = 2,message = "最小为2")

@Max(value = 5000000,message = "最多为5000000")

@Transient//需要被持久化的属性

@Transient//表示该属性并非一个到数据库表的字段的映射

@JoinTable//通过表关联的方式来映射一对多的关系时，用于标注用于关联表，

@JoinTable(
    name = "app_info_category",
    joinColumns = {@JoinColumn(name = "id")},//表示本表字段id为外键
    inverseJoinColumns = {@JoinColumn(name = "appId")}//关联到app_info_category表中的appId字段。
)

@ManyToMany//注解可定义的多对多关联，通过关联表来保存两个实体之间的关联关系

@ManyToOne//注解可定义的多对一关联，通过关联表来保存两个实体之间的关联关系

@OneToMany//注解可定义的一对多关联，通过关联表来保存两个实体之间的关联关系

@OneToOne//注解可定义的一对一关联，则关联表每个外键都必须是唯一约束，通过关联表来保存两个实体之间的关联关系

-------------hibernat--------------


-----------mybatis-plus-------------------


@TableId(type = IdType.AUTO)//配置主键属性 自增长

@TableField(value = "数据库表中字段名") //配置表中字段与类的属性的映射

@TableName("数据库中的表名")//配置数据库中的表明与类名的映射

-----------mybatis-plus-------------------

-----------springmvc----------------------------
@Component//泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。（springMVC）

@RequestMapping//表示是一个用来处理请求地址映射的注解（表示类中的所有响应请求的方法都是以该地址作为父路径）

@RequestBody//该注解用于读取Request请求的body部分数据,系统解析，然后把相应的数据绑定到要返回的对象上；

@ResponseBody//该注解用于将Controller的方法返回的对象，转换为指定格式后，写入到Response对象的body数据区。

@RequestParam String str
 //获取提交的参数
(@RequestParam(value="aa", required=true)
// equired=false表示不传的话，会给参数赋值为null，required=true就是必须要有
@RequestParam(value="aa")
 //下面的对传入参数指定为aa，如果前端不传aa参数名，会报错 
 
 @TableName (name="") //表示该类对应的数据库中的表名

-----------springmvc----------------------------


--------------------Junit-------------
@Test//注解是JUnit测试的基础，它提供了其他作用 

 
@Test(timeout=100) //测试一断代码运行时间。
--------------------Junit-------------




