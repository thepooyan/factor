import clsx from "clsx";

interface props {
  reverse?: boolean
  className?: string
}
const Spinner = ({reverse, className}:props) => {
  return (
    <div class="flex items-center justify-center  ">
      <div class={clsx(
        "animate-spin rounded-full h-4 w-4 border-4 border-t-transparent border-black",
        reverse && "border-white",
        className
      )}></div>
    </div>
  );
};

export default Spinner;

