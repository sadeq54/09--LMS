import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8001",
    // prepareHeaders: async (headers) => {
    //   const token = await window.Clerk?.session?.getToken();
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

  //   if (result.error) {
  //     const errorData = result.error.data;
  //     const errorMessage =
  //       errorData?.message ||
  //       result.error.status.toString() ||
  //       "An error occurred";
  //     toast.error(`Error: ${errorMessage}`);
  //   }
  //   const isMutationRequest =
  //   (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

  // if (isMutationRequest) {
  //   const successMessage = result.data?.message;
  //   if (successMessage) toast.success(successMessage);
  // }

  if (result.data) {
    result.data = result.data.data;
  } else if (
    result.error?.status === 204 ||
    result.meta?.response?.status === 24
  ) {
    return { data: null };
  }

  return result;
} catch (error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error";

  return { error: { status: "FETCH_ERROR", error: errorMessage } };
}
};



export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses"],
  endpoints: (build) => ({
    /* 
    ===============
    USER CLERK
    =============== 
    */
    

    /* 
    ===============
    COURSES
    =============== 
    */
    
    getCourses: build.query<Course[], {category?: string} >({  // backend wi
      query : ({category}) => ({
        url: "courses",
        params: {category}
      }),
      providesTags: ["Courses"],
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result , error, id) => [{type: "Courses" , id}],
    }),
    
    /* 
    ===============
    TRANSACTIONS
    =============== 
    */

    /* 
    ===============
    USER COURSE PROGRESS
    =============== 
    */
      
    }),
  });

console.log("api",api)
export const {
  
  useGetCoursesQuery,
  useGetCourseQuery,

} = api;

// export const {
//   // useUpdateUserMutation,
//   // useCreateCourseMutation,
//   // useUpdateCourseMutation,
//   // useDeleteCourseMutation,
//   useGetCoursesQuery,
//   useGetCourseQuery,
//   // useGetUploadVideoUrlMutation,
//   // useGetTransactionsQuery,
//   // useCreateTransactionMutation,
//   // useCreateStripePaymentIntentMutation,
//   // useGetUserEnrolledCoursesQuery,
//   // useGetUserCourseProgressQuery,
//   // useUpdateUserCourseProgressMutation,
// } = api;

