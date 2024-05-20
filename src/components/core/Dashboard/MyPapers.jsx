import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserPaper } from "../../../services/operations/examPaperAPI";
import { useSelector } from "react-redux";
import { VscAdd } from "react-icons/vsc";
import IconBtn from "../../common/IconBtn";
import PapersTable from "./UserPaper/PapersTable";

const MyPapers = () => {
  const { token } = useSelector((state) => state.auth);

  const [papers, setPapers] = useState([]);

  const navigate = useNavigate();

  //fetching the papers uploaded by a particular student
  useEffect(() => {
    const fetchPapers = async () => {
      const result = await fetchUserPaper(token);

      if (result) {
        setPapers(result);
      }
    };

    fetchPapers();
  }, []);
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">
          Uploaded by me
        </h1>

        <IconBtn text="Upload Paper" onclick={() => navigate("/uploadPaper")}>
          <VscAdd />
        </IconBtn>
      </div>

      {papers && <PapersTable papers={papers} setPapers={setPapers} />}
    </div>
  );
};

export default MyPapers;
