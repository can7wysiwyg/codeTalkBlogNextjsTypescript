// 'use client'

// import React from 'react';
// import { LoginAdmin } from '@/action/admin'; // Import the server function

// export default function Login() {
//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Get form data
//         const formData = new FormData(e.target as HTMLFormElement);

//         // Call the LoginAdmin function with form data
//         const result = await LoginAdmin(formData);

//         // Handle login errors (display messages, etc.)
//         if (result?.error) {
//             console.error(result.error);
//             // Display error on the UI (e.g., using an alert or toast)
//         }
//     };

//     return (
//         <section className="section">
//             <div className="container">
//                 <div className="col-lg-12 mt-4 mt-lg-0">
//                     <form onSubmit={handleSubmit} className="row">
//                         <div className="col-md-12">
//                             <label htmlFor="email" className="text-black-300">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 className="form-control mb-4"
//                                 placeholder="Email"
//                                 name="email"
//                                 id="email"
//                             />
//                         </div>
//                         <div className="col-12">
//                             <label htmlFor="password" className="text-black-300">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 className="form-control mb-4"
//                                 placeholder="Password"
//                                 name="password"
//                                 id="password"
//                             />
//                         </div>
//                         <div className="col-12">
//                             <button className="btn btn-outline-primary" type="submit">
//                                 Login
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// }


import Image from 'next/image'
import React from 'react'
import ArRight from "./arrow-right.png"
import { LoginAdmin } from '@/action/admin'
import { getSession } from '@/db/getSession'
import { redirect } from 'next/navigation'

export default async function Login() {

    const session = await getSession()

    if(session) redirect('/')


  return (
    <>
<section className="section">
<div className="container">

<div className="col-lg-12 mt-4 mt-lg-0">
					<form  action={LoginAdmin} className="row">
						
						<div className="col-md-12">
            <label htmlFor="email" className="text-black-300">
                  Email
                </label>

							<input type="email" className="form-control mb-4" placeholder="Email" name="email" id="email" />
						</div>
						<div className="col-12">

            <label htmlFor="password" className="text-black-300">
                  Password
                </label>
            

							<input type="password" className="form-control mb-4" placeholder="password" name="password" id="password" />
						</div>
						
						<div className="col-12">
							<button className="btn btn-outline-primary" type="submit">Login</button>
						</div>
					</form>
				</div>



  </div>
  </section>
    
    
    
    </>
  )
}
