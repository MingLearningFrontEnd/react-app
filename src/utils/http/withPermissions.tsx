


 //外层函数，接收所拥有的权限和当前按钮所需要的权限
function withPermissions(userPermission:string[],requiredPermission:string[]):(Component:React.FC)=>React.FC{
    return function(Component:React.FC){ //高阶组件 接收一个组件当参数
        return function(props:any):React.ReactElement|null{  //返回的一个组件
            const hasPermission:boolean=requiredPermission.every(item=>userPermission.includes(item)) //判断有没有权限，是个布尔值
                if(!hasPermission){
                    return null
                }
            return<Component {...props}/>
        }

    }
}

export default withPermissions