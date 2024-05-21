import React, { useState } from "react";
import { useForm } from "react-hook-form";
import searchIcon from "../../../../assets/Images/search-icon.svg";
import { useSelector } from "react-redux";
import { coursePaper } from "../../../../services/operations/examPaperAPI";
import toast from "react-hot-toast";
import { Table, Tbody, Td, Tr, Th, Thead } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";

const SearchPaper = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const [subjectPapers, setSubjectPapers] = useState([]);

  const onSubmit = async (data) => {
    console.log("form data: ", data);
    const toastId = toast.loading("Fetching...");

    try {
      const response = await coursePaper(
        { courseCode: data.courseCode },
        token
      );

      console.log("SEARCH PAPER API RESPONSE...", response);

      setSubjectPapers(response.coursePapers);
      console.log("subjectPaper: ", subjectPapers);
    } catch (error) {
      console.log("SEARCH PAPER API ERROR...", error);
      //   toast.error(error.response?.data?.message);
    }

    toast.dismiss(toastId);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#1E2A47]  border-x-lmshadow flex h-[100%] p-[6px] justify-between items-center searchbar-container rounded-[15px]">
          <img
            src={searchIcon}
            className="hidden md:block pr-[16px] pl-[16px] text-white"
            alt="search-icon"
          />

          <input
            id="courseCode"
            placeholder="Enter Course Code"
            //   style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
            className="w-[80%] bg-none rounded-[0.5rem] bg-[#1E2A47] p-[8px]  outline-none text-lmtext text-[20px] placeholder-lmtext"
            {...register("courseCode", { required: true })}
          />

          <button
            className=" md:block min-w-[84px] p-[12px] bg-btn border-none rounded-[10px] text-white text-[16px] font-bold cursor-pointer hover:scale-90 transition-all duration-200 hidden"
            type="submit"
          >
            Search
          </button>
          <button type="submit">
            <img
              src={searchIcon}
              className="md:hidden sm:block pr-[16px] pl-[16px] text-white"
              alt="search-icon"
            />
          </button>
        </div>
      </form>

      {subjectPapers.length > 0 && (
        <div>
          <Table className="rounded-xl mt-10">
            <Thead>
              <Tr className="flex gap-x-40 rounded-t-md border-b border-[#0079ff] px-6 py-2 justify-evenly">
                <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                  Exam
                </Th>
                <Th className="flex-1 text-center text-sm font-medium uppercase text-richblack-100">
                  Year
                </Th>
                <Th className="flex-1 text-right text-sm font-medium uppercase text-richblack-100">
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {subjectPapers.length === 0 ? (
                <Tr>
                  <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                    No paper found!!
                  </Td>
                </Tr>
              ) : (
                subjectPapers.map((paper) => {
                  return (
                    paper.course && (
                      <Tr
                        key={paper._id}
                        className="flex justify-between border-b border-richblack-800 px-6 py-8"
                      >
                        <Td className="text-sm font-medium text-richblack-100">
                          <div className="flex flex-col justify-between">
                            <p className="text-medium font-semibold text-richblack-5">
                              {paper?.examType.toUpperCase()}
                            </p>
                          </div>
                        </Td>

                        <Td className="text-sm font-medium text-richblack-100">
                          <div className="flex flex-col justify-between">
                            <p className="text-medium font-semibold text-richblack-5">
                              {paper?.year}
                            </p>
                          </div>
                        </Td>

                        <Td className="text-sm font-medium text-yellow-50">
                          <div className="flex flex-col justify-between">
                            <Link
                              className="text-medium font-semibold"
                              to={`${paper?.paperImage}`}
                            >
                              View
                            </Link>
                          </div>
                        </Td>
                      </Tr>
                    )
                  );
                })
              )}
            </Tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default SearchPaper;
