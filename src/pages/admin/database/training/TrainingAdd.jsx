import Navbar from "../../../../components/admin/Navbar";
import Training from "../../../../components/admin/Training";

function TrainingAdd() {

  return (
    <>
      <Navbar title="Training">
        <Training bulkButton={true} />
      </Navbar>
    </>
  );
}
export default TrainingAdd;