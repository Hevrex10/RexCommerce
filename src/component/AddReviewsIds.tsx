// import { useEffect } from "react";
// import { supabase } from "../supabaseCl";
// import { v4 as uuid } from "uuid";

// export default function AddReviewIds() {
//   useEffect(() => {
//     async function fixReviews() {
//       const { data: products, error } = await supabase
//         .from("ProductList")
//         .select("id, reviews");

//       if (error) {
//         console.log("Error fetching products:", error);
//         return;
//       }

//       for (const product of products) {
//         const reviews = product.reviews || [];

//         const updatedReviews = reviews.map((rev: any) => {
//           return rev.id ? rev : { ...rev, id: uuid() };
//         });

//         await supabase
//           .from("ProductList")
//           .update({ reviews: updatedReviews })
//           .eq("id", product.id);

//         console.log(`Updated product ${product.id}`);
//       }

//       alert("Review IDs added to all products!");
//     }

//     fixReviews();
//   }, []);

//   return <p>Adding review IDs... Check console.</p>;
// }
