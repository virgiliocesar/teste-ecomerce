import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrder from "../pages/dashboard/user/UserOrder";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManagerOrders from "../pages/dashboard/admin/manageOrders/ManagerOrders";
import Contact from "../pages/contact/Contact";

import PagesLayout from "../pages/pages/PageLayout/PagesLayout";
import Page from "../pages/pages/Page";
import Sobre from "../pages/pages/Sobre";
import PrivacyPolicy from "../pages/pages/PrivacyPolicy";
import TermsAndConditions from "../pages/pages/TermsAndConditions";
import Tracking from "../pages/pages/Tracking";
import Help from "../pages/pages/Help";
import DeliveryPolicy from "../pages/pages/DeliveryPolicy";
import ExchangePolicy from "../pages/pages/ExchangePolicy";
import WorkWithUs from '../pages/pages/WorkWithUs';





const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/categoria/:categoryName",
                element: <CategoryPage />
            },
            {
                path: "/pesquisa",
                element: <Search />
            },
            {
                path: "/loja",
                element: <ShopPage />
            },
            {
                path: "/paginas",
                element: <PagesLayout />,
                children: [
                    { path: "", element: <Page /> },
                    { path: "ajuda", element: <Help /> },
                    { path: "sobre", element: <Sobre /> },
                    { path: "privacidade", element: <PrivacyPolicy /> },
                    { path: "termos", element: <TermsAndConditions /> },
                    { path: "rastreio", element: <Tracking /> },
                    { path: "politica-de-entrega", element: <DeliveryPolicy /> },
                    { path: "politica-de-troca", element: <ExchangePolicy /> },
                    { path: "trabalhe-conosco", element: <WorkWithUs /> }
                ]
            },
            {
                path: "/loja/:id",
                element: <SingleProduct />
            },
            {
                path: "/success",
                element: <PaymentSuccess />
            },
            {
                path: "/orders/:orderId",
                element: <OrderDetails />
            },
            {
                path: "/contato",
                element: <Contact />
            },
        ]
    },
    {
        path: "/entrar",
        element: <Login />
    },
    {
        path: "/cadastrar",
        element: <Register />
    },
    //^dashboard routes start here
    {
        path: "/painel",
        element: <PrivateRoute ><DashboardLayout /></PrivateRoute>, //TODO: user private routes her
        children: [
            //^ user routes
            {
                path: "",
                element: <UserDMain />
            },
            {
                path: "pedidos",
                element: <UserOrder />
            },
            {
                path: "pagamentos",
                element: <UserPayments />
            },
            {
                path: "perfil",
                element: <UserProfile />
            },
            {
                path: "avaliacoes",
                element: <UserReviews />
            },
            //^ admin routes (only accessible by admin) //TODO: private routes with includes role
            {
                path: "admin",
                element: <PrivateRoute role="admin"><AdminDMain /></PrivateRoute>
            },
            {
                path: "adicionar-produto",
                element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute>
            },
            {
                path: "gerenciar-produtos",
                element: <PrivateRoute role="admin"> <ManageProduct /> </PrivateRoute>
            },
            {
                path: "atualizar-produto/:id",
                element: <PrivateRoute role="admin"><UpdateProduct /></PrivateRoute>
            },
            {
                path: "usuarios",
                element: <PrivateRoute role="admin"><ManageUser /></PrivateRoute>
            },
            {
                path: "gerenciar-pedidos",
                element: <PrivateRoute role="admin"><ManagerOrders /></PrivateRoute>
            }
        ]
    }
]);

export default router