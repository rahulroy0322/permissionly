/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import { Route, Router } from '@solidjs/router';



// const root = document.getElementById('root')

// render(() => <App />, root!)

const wrapper = document.getElementById("app");

if (!wrapper) {
    throw new Error("Wrapper div not found");
}

render(() => <Router>
    <Route path="/" component={App} />

     {/* <Route path="*404" component={NotFound} /> */}
</Router>, wrapper)




// import { A } from "@solidjs/router";

// function DashboardPage() {
//   return (
//     <main>
//       <nav>
//         <A href="/">Home</A>
//       </nav>
//       {/* This is a relative path that, from /dashboard, links to /dashboard/users */}
//       <A href="users">Users</A>
//     </main>
//   );
// }