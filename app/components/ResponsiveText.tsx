interface ResponsiveTextProps {
  values: string[];
  groupSize?: number;
  className?: string;
  separator?: string;
}

export default function ResponsiveText({
  values,
  groupSize = values.length,
  className = "",
  separator = " ",
}: ResponsiveTextProps) {
  const desktopLines: string[] = [];

  for (let i = 0; i < values.length; i += groupSize) {
    const group = values.slice(i, i + groupSize).join(separator);
    desktopLines.push(group);
  }

  return (
    <>
      {/* 모바일: 줄마다 <br /> */}
      <span className={`block sm:hidden ${className}`}>
        {values.map((text, idx) => (
          <span key={idx}>
            {text}
            <br />
          </span>
        ))}
      </span>

      {/* 데스크탑: groupSize 단위로 줄바꿈 */}
      <span className={`hidden sm:inline-block ${className}`}>
        {desktopLines.map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < desktopLines.length - 1 && <br />}
          </span>
        ))}
      </span>
    </>
  );
}
