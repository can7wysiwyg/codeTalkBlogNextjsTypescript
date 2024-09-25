
import { getSession } from "@/db/getSession";
import Image from "next/image";


export default  async function Home() {

  const session =  await getSession()

  //  console.log(session) 
  return (
   <div>
           </div>
  );
}
