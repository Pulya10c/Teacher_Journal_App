export default function changeStudentMark(
  listMarks: { _id: string; mark: number }[],
  idStudent: string,
  newMark: number
): void {
  const isStudent: any = listMarks.find(({ _id }) => _id === idStudent);
  if (isStudent) {
    listMarks.forEach(studentMark => {
      if (studentMark._id === idStudent) {
        studentMark.mark = newMark;
      }
    });
  } else {
    const newStudent: {
      _id: string;
      mark: number;
    } = {
      _id: idStudent,
      mark: newMark
    };

    listMarks.push(newStudent);
  }
}
