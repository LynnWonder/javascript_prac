/**
 * 其实返回的就是路由匹配组件
 * 对应路由表中的path component等属
 * 其中包含一步用map方法渲染列表
 * @param routes
 * @param extraProps
 * @param switchProps
 * @returns {*}
 */
const renderRoutes=(routes,extraProps = {}, switchProps = {})=>{
    return (
        <Switch {...switchProps}>
            {routes.map(item=>{
                return(
                    <Route
                        path={item.path}
                        exact={item.exact}
                        render={(props)=>{
                            return <item.component {...props} {...extraProps}/>
                        }}
                    />
                )
            })}
        </Switch>
    )
}
/**
 * 一般路由表配置
 */
const routeConfig = [
    {
        path:"/todo",
        // component:ToDoList,
        // 测试使用路由按需加载
        component:Loadable({
            loader:()=>import('../components/TodoList/todolist'),
            loading:Loading,
            delay:1000,
        }),
        routes: [
            {
                path:"/todo/another",
                exact:true,
                component:Another,
            },
        ],
    },
    {
        path:"/input",
        component:Input,
        routes:[
            {
                path:"/input/pass",
                exact:true,
                component:Parent,
            }
        ]
    },
    {
        path:"/counter",
        exact:true,
        component:IndexPage,
    },
    {
        path:"/zoom",
        exact:true,
        component:ZoomImg,
    },
    {
        path:"/lottie",
        component:LottieDemo,
        routes: [
            {
                path:"/lottie/more",
                exact:true,
                component:LottieMore,
            },
        ],
    },
    {
        path:"/form",
        exact:true,
        component:MyForm,
    },
    // {
    //   path:"/*",
    //   component:()=><Redirect to="/counter"/>,
    //   requiresAuth:false,
    // },
];