import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { MyClassComponent } from "./components/MyComponent/MyClassComponent";
import MyFunctionalComponent from "./components/MyComponent/MyFunctionalComponent";
import LibraryComponent from "./components/MyComponent/LibraryComponent";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/MyClassComponent',
    element: <MyClassComponent />
    },
    {
        path: '/MyFunctionalComponent',
        element: <MyFunctionalComponent />
    },
    {
        path: '/LibraryComponent',
        element: <LibraryComponent />
    }
];

export default AppRoutes;
