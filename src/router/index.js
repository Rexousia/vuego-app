import { createRouter, createWebHistory } from 'vue-router';
import BookEditComponent from '../components/BookEditComponent.vue';
import BodyComponent from './../components/BodyComponent.vue';
import BookComponent from './../components/BookComponent.vue';
import BooksAdminComponent from './../components/BooksAdminComponent.vue';
import BooksComponent from './../components/BooksComponent.vue';
import LoginComponent from './../components/LoginComponent.vue';
import UserEditComponent from './../components/UserEditComponent.vue';
import UsersComponent from './../components/UsersComponent.vue';

// Import the main components that will be used in the router
// These components will be rendered based on the route that the user is visiting

// Define an array of route objects
// Each route object specifies a path, a name, and a component that should be rendered for that route
const routes = [
    {
        path: '/',
        name: 'HomeComponent',
        component: BodyComponent,
    },
    {
        path: '/login',
        name: 'LoginComponent',
        component: LoginComponent,
    },
    {
        path: '/books',
        name: 'Books',
        component: BooksComponent,
    },
    {
        path: '/books/:bookName',
        name: 'Book',
        component: BookComponent,
    },
    {
        path: '/admin/books',
        name: 'BooksAdminComponent',
        component: BooksAdminComponent,
    },
    {
        path: '/admin/books/:bookId',
        name: 'BookEditComponent',
        component: BookEditComponent,
    },
    {
        path: '/admin/users',
        name: 'UsersComponent',
        component: UsersComponent,
    },
    {
        path: '/admin/users/:userId',
        name: 'User',
        component: UserEditComponent,
    },
    
]

// Create a new router using the `createRouter` function from the 'vue-router' library
// The router will use the `createWebHistory` function to handle browser history
// The router will use the `routes` array to define the available routes
const router = createRouter({history: createWebHistory(), routes})

// Export the router so that it can be used in other parts of the application
export default router
