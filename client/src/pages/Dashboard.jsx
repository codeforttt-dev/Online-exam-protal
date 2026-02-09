// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchStudentDashboard } from "../redux/thunks/studentThunk";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { user, token } = useSelector((state) => state.user);
//   const { dashboard, loading, error } = useSelector((state) => state.exam);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchStudentDashboard());
//     }
//   }, [token, dispatch]);

//   if (!token) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         Please login to view dashboard
//       </div>
//     );
//   }

//   if (loading || !dashboard || !user) {
//     return (
//       <div className="p-6 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
//         <p>Loading your dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   const { stats, registrations, results } = dashboard;

//   return (
//     <div className="space-y-5 p-4 md:p-5 lg:p-6">
//       {/* Welcome - real user */}
//       <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl px-5 py-5 shadow-md">
//         <h2 className="text-xl md:text-2xl font-bold mb-1">
//           Welcome back, {user.name}!
//         </h2>
//         <p className="text-sm md:text-base text-white/90">
//           Username: <span className="font-semibold">{user.username}</span> | Role: {user.role}
//         </p>
//       </div>

//       {/* REAL stats from backend only */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
//           <div className="text-2xl font-bold text-orange-600 mb-1">
//             {stats.totalRegistrations}
//           </div>
//           <p className="text-xs text-gray-600">Total Registrations</p>
//         </div>
//         <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
//           <div className="text-2xl font-bold text-green-600 mb-1">
//             {stats.totalResults}
//           </div>
//           <p className="text-xs text-gray-600">Total Results</p>
//         </div>
//       </div>

//       {/* My Olympiads = REAL registrations */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
//         <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
//           <h3 className="text-lg font-bold text-gray-800">My Olympiads</h3>
//         </div>
//         {registrations.length === 0 ? (
//           <p className="text-sm text-gray-600">
//             You have not registered for any exam yet.
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {registrations.map((reg) => (
//               <div
//                 key={reg._id}
//                 className="flex justify-between items-center p-3 border border-gray-100 rounded-lg"
//               >
//                 <div>
//                   <p className="font-semibold text-sm text-gray-800">
//                     {reg.exam?.title}
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     {reg.exam?.description || "No description"}
//                   </p>
//                 </div>
//                 <div className="text-right text-xs">
//                   <p className="font-semibold text-gray-800">
//                     {reg.paymentStatus.toUpperCase()}
//                   </p>
//                   <p className="text-gray-500">
//                     {new Date(reg.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Recent Results = REAL results */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
//         <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
//           <h3 className="text-lg font-bold text-gray-800">Recent Results</h3>
//         </div>
//         {results.length === 0 ? (
//           <p className="text-sm text-gray-600">
//             You don't have any result yet.
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {results.map((r) => (
//               <div
//                 key={r._id}
//                 className="flex justify-between items-center p-3 border border-gray-100 rounded-lg"
//               >
//                 <div>
//                   <p className="font-semibold text-sm text-gray-800">
//                     {r.exam?.title}
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     {new Date(r.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right text-xs">
//                   <p className="font-bold text-gray-800">
//                     {r.score}/{r.total}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
