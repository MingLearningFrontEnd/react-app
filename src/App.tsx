import { RouterProvider } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { generateRoutes } from "./utils/http/generatesRoutes";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "./router";
import { createBrowserRouter } from "react-router-dom";
import { getMenu } from "./api/user";
import { setMenu } from "./store/login/authSlice";
import {Spin} from 'antd'


function App() {
  const { token } = useSelector((state: any) => state.authSlice)
  const [routerss, setRouter] = useState<any>(null)
  const dispatch = useDispatch()
  useEffect(() => {
    async function loadData() {
      const { data } = await getMenu() //调用getMenu接口 解构出里面的data
      if (data.length) { //判断有没有数据，登录有数据才这样操作
        dispatch(setMenu(data))//存入redux中的原始数据 用于创建动态路由使用
        const routers = generateRoutes(data) //动态创建的路由表
        const myRoutes = [...routes]
        myRoutes[0].children = routers
        myRoutes[0].children[0].index = true
        const router = createBrowserRouter(myRoutes)
        setRouter(router)
      }else{//未登录时使用初始路由
        const router = createBrowserRouter(routes)
        setRouter(router)
      }
    }
    loadData()
  },[token])
  if (routerss) {
    return (
      <div className="App">
        <Suspense fallback={<Spin></Spin>}>
          <RouterProvider router={routerss} />
        </Suspense>

      </div>
    );
  } else {
    return <Spin/>
  }

}

export default App;
