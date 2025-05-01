import CreateSubjects from "./CreateSubjects";

export default function CreateSubjects10() {
    return <CreateSubjects endPointParams={import.meta.env.VITE_MATERIALS_URL} grade={10}/>
  }