import Navbar from "../../../components/admin/Navbar";
import Training from "../../../components/admin/Training";

function AddQuestion() {
  const location = useLocation();

  const { syllabusName, bookName, chapterName, question, syllabusId, chapterId, bookId } = location.state || {};

console.log('training cquestion syllabus id',syllabusId);
console.log('training cquestion chapter id',chapterId);
console.log('training cquestion book id',bookId);


  return (
    <>
      <Navbar title="Syllabus">
        <Training syllabusNav={true} syllabusName={syllabusName} bookName={bookName} chapterName={chapterName} question={question} syllabusId={syllabusId} chapterId={chapterId} bookId={bookId}/>
      </Navbar>
    </>
  );
}
export default AddQuestion;