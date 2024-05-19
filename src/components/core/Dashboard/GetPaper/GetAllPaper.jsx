import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPaper } from "../../../../services/operations/examPaperAPI";
import { Table, Tbody, Td, Tr, Th, Thead } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GetAllPaper = () => {
  const { token } = useSelector((state) => state.auth);

  const [allPaper, setAllPaper] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllPaper = async () => {
      setLoading(true);

      try {
        const result = await getAllPaper(token);

        setAllPaper(result);

        setLoading(false);

        console.log("getAllPaper api result: ", result);
        console.log("allPaper", allPaper);
      } catch (error) {
        console.log("Error while fetching all the papers", error);
      }

      setLoading(false);
    };

    fetchAllPaper();
  }, []);

  return (
    <div>
      <Table className="rounded-xl ">
        <Thead>
          <Tr className="flex gap-x-40 rounded-t-md border-b border-b-yellow-50 px-6 py-2 justify-evenly">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Course
            </Th>
            <Th className="flex-1 text-center text-sm font-medium uppercase text-richblack-100">
              Code
            </Th>
            <Th className="flex-1 text-right text-sm font-medium uppercase text-richblack-100">
              Exam
            </Th>
            <Th className="flex-1 text-right text-sm font-medium uppercase text-richblack-100">
              Year
            </Th>
            <Th className="flex-1 text-right text-sm font-medium uppercase text-richblack-100">
              Action
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {allPaper.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No paper found!!
              </Td>
            </Tr>
          ) : (
            allPaper.map((paper) => {
              return (
                paper.course && (
                  <Tr
                    key={paper._id}
                    className="flex justify-between  border-b border-richblack-800 px-6 py-8"
                  >
                    <Td className="text-sm font-medium text-richblack-100">
                      <div className="flex flex-col justify-between">
                        <p className="text-medium font-semibold text-richblack-5 w-4 flex flex-wrap">
                          {paper.course.courseName.toUpperCase()}
                        </p>
                      </div>
                    </Td>

                    <Td className="text-sm font-medium text-richblack-100">
                      <div className="flex flex-col justify-between">
                        <p className="text-medium font-semibold text-richblack-5">
                          {paper?.course?.courseCode.toUpperCase()}
                        </p>
                      </div>
                    </Td>

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

                    <Td className="text-sm font-medium text-[#0079ff]">
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
  );
};

export default GetAllPaper;
