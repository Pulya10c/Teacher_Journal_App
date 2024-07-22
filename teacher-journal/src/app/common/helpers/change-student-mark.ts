export default function changeStudentMark(
  listMarks: { id: string; mark: number }[],
  idStudent: string,
  newMark: number
): void {
  const isStudent: any = listMarks.find(({ id }) => id === idStudent);
  if (isStudent) {
    listMarks.forEach(studentMark => {
      if (studentMark.id === idStudent) {
        studentMark.mark = newMark;
      }
    });
  } else {
    const newStudent: {
      id: string;
      mark: number;
    } = {
      id: idStudent,
      mark: newMark
    };

    listMarks.push(newStudent);
  }
}
