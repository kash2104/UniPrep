import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, Tbody, Td, Tr, Th, Thead } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  deletePaper,
  fetchUserPaper,
} from "../../../../services/operations/examPaperAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useSelector } from "react-redux";

const PapersTable = ({ papers, setPapers }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);

  //deleteing the course
  const handlePaperDelete = async (paperId, courseId, paperImage) => {
    setLoading(true);

    //getting the public id of the paper
    const part = paperImage.split("/");
    const id = part[part.length - 1].split(".")[0];
    const publicId = `UniShare Project/${id}`;

    // console.log("Public id: ", publicId);

    await deletePaper(
      { paperId: paperId, courseId: courseId, publicId: publicId },
      token
    );

    //finding the updated list of papers
    const result = await fetchUserPaper(token);

    if (result) {
      setPapers(result);
    }

    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div>
      <Table className="rounded-xl ">
        <Thead>
          <Tr className="flex gap-x-40 rounded-t-md border-b border-b-caribbeangreen-300 px-6 py-2 justify-evenly">
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
          {papers.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No papers uploaded!!
              </Td>
            </Tr>
          ) : (
            papers.map((paper) => {
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

                    <Td className="text-sm font-medium text-[#d7dde4]">
                      <button
                        disabled={loading}
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Do you want to delete the paper?",
                            text2: "This paper will be deleted permanently",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () =>
                                  handlePaperDelete(
                                    paper._id,
                                    paper?.course?._id,
                                    paper?.paperImage
                                  )
                              : () => {},
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          })
                        }
                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      >
                        <RiDeleteBin6Line size={20} />
                        Delete
                      </button>
                    </Td>
                  </Tr>
                )
              );
            })
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default PapersTable;
