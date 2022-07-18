export const cssClassName = (cssModule: Record<string, string>, classNames: Array<string>): string => {
  const styles: Array<string> = []
  for (let i = 0; i < classNames.length; i++) {
    const name = classNames[i];
    if (cssModule[name]) {
      styles.push(cssModule[name])
    }
  }
  return styles.join(' ');
}