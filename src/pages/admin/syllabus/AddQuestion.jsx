import Navbar from "../../../components/admin/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Training from "../../../components/admin/Training";

function AddQuestion() {
  const location = useLocation();

  const { syllabusName, bookName, chapterName, question } = location.state || {};

  return (
    <>
      <Navbar title="Syllabus">
        <Training syllabusName={syllabusName} bookName={bookName} chapterName={chapterName} question={question}/>
      </Navbar>
    </>
  );
}
export default AddQuestion;