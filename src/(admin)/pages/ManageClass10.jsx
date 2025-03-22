import ManageClass from './ManageClass';

export default function ManageClass10() {
  return <ManageClass endPointParams={import.meta.env.VITE_CLASSES_URL} grade={10} />;
}
