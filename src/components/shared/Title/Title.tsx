interface TitleProps {
  className?: string;
  title?: string;
  children?: string;
}

const Title = ({ className, title, children }: TitleProps) => {
  const currentTitle = title || children;
  return (
    <h1 className={`${className} text-3xl font-bold lg:text-6xl`}>
      {currentTitle}
    </h1>
  );
};

export default Title;
