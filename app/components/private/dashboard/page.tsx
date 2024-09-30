import { getSession } from "@/db/getSession";

import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function dashboardmenu() {
  const session = await getSession();

  if (!session) redirect("/");

  return (
    <>
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h3 className=" text-center add-letter-space mb-5">
                choose what to do
              </h3>

              <div className="text-center ">
                <ul className="list-unstyled">
                  <li>
                    <Link
                      href="/components/private/catCreate"
                      
                    >
                      <i className="fas fa-folder"></i> Create Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/components/private/categories"
                      
                    >
                      <i className="fas fa-list"></i>
                      View Categories
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/components/private/artCreate"
                      
                    >
                      <i className="fas fa-pen"></i>
                      Write New Article
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/components/private/articles"
                      
                    >
                      <i className="fas fa-eye"></i>
                      View Articles
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
