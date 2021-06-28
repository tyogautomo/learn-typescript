type CourseGoal = {
  title: string;
  description: string;
  completionDate: Date;
};

function createCourseGoal(title: string, description: string, completionDate: Date): CourseGoal {
  const course: Partial<CourseGoal> = {};
  course.title = title;
  // course.description = description;
  course.completionDate = completionDate;
  return <CourseGoal>course;
};

const course = createCourseGoal('Gajebo', 'ga jelas banget', new Date());
console.log(course);

const names: Readonly<string[]> = ['Joni', 'Marta'];
// names.push('Tata'); // this will error because the variable is readonly
