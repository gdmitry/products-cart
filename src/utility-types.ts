// Partial

interface Assignment {
  studentId: string,
  title: string,
  grade: number,
  verified?: boolean,
}

// Function to update props 
const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
  return { ...assign, ...propsToUpdate };
}

const assign1: Assignment = {
  studentId: '121',
  title: '232',
  grade: 6,
  verified: true
}

console.log(updateAssignment(assign1, { grade: 78 }));
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 });

// Required and readonly
const recordAssignment = (assign: Required<Assignment>): Assignment => {
  // send to db;
  return assign;
};

const assignVerified: Readonly<Assignment> = {
  ...assignGraded,
  verified: true
 };

//  assignVerified.verified = false;
// recordAssignment(assignGraded);
recordAssignment({ ...assignGraded, verified: true });

// Record
const hexColorMap: Record<string, string> = {
  red: 'FF0000',
};

type Students = "Sara" | "Kelly"
type LetterGrades = "A" | 'B' | 'C' | 'U'

const finalGrades: Record<Students, LetterGrades> = {
  Sara: "B",
  Kelly: "U",
}

interface Grades {
  assign1: number,
  assign2: number,
}

const gradeData: Record<Students, Grades> = {
  Sara: { assign1: 55, assign2: 93 },
  Kelly: { assign1: 56, assign2: 99 },
};

// Pick and Ommit
type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = {
  studentId: "3434",
  grade: 34,
}

type AssignmentPreview = Omit<Assignment, "grade" | "verified">

const preview: AssignmentPreview = {
  studentId: 'rtrt',
  title: "Project",
}

// Exclude and Extract (work only with string literal union type)
type adjestedGrade = Exclude<LetterGrades, "U">;
type highGrades = Extract<LetterGrades, "A" | "B">;

// Nonnullable
type AllPossibleGrades = 'Dave' | 'John' | null | undefined;

type namesOnly = NonNullable<AllPossibleGrades>;

// ReturnType
// type newAssign = { title: string, points: number };

const createNewAssign = (title: string, points: number) => {
  return { title, points }
}

type newAssign = ReturnType<typeof createNewAssign> // always updates newAssign func
const tsAssign: newAssign = createNewAssign("FFF", 100);

// Parameters
type AssignParams = Parameters<typeof createNewAssign>;
const assignArgs: AssignParams = ["Cen", 44];

const tsAssign2: newAssign = createNewAssign(...assignArgs);

// Awaited - hepls us to get the ReturnType of Promise

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

const fetchUsers = async(): Promise<User[]> => {
  const data = await fetch('url')
  .then(res => {
    return res.json();
  })
  .catch(err => {
    if (err instanceof Error) {
      console.log(err.message);
    }
  });

  return data;
}

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>;

fetchUsers().then(users => console.log(users));