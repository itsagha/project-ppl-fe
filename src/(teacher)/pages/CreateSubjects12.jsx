import CreateSubjects from "./CreateSubjects";

export default function CreateSubjects12() {
    return <CreateSubjects endPointParams={import.meta.env.VITE_MATERIALS_URL} grade={12}/>
  }