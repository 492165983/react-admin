import Home from '../components/home';
import Category from '../containers/category';
import Product from '../containers/product';
import ProductForm from '../containers/product/product-form';
import Role from '../containers/role';

const routes = [
  {
    path:'/',
    component:Home,
    exact:true
  },{
    path:'/category',
    component:Category,
    exact:true
  },{
    path: '/product',
    component: Product,
    exact: true
  },{
    path: '/product/add',
    component: ProductForm,
    exact: true
  },{
     // /product/update/5ddde47170cb1267ccc6aba8 因为id有n个    在这里是匹配多个地址
    path: '/product/update/:id',
    component: ProductForm,
    exact: true
  },{
    path: '/role',
    component: Role,
    exact: true
  }
];

export default routes;
