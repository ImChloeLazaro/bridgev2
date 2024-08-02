import {
  childrenAtom,
  collegeAtom,
  fatherAtom,
  motherAtom,
  postGraduateAtom,
  selectedTabAtom,
  techVocSpecialAtom,
  collegeDateOfAttendanceAtom,
  collegeDateOfAttendanceDateRangeAtom,
  collegeCourseDateOfAttendanceDateRangeAtom,
  collegeCourseDateOfAttendanceAtom,
  postGraduateDateOfAttendanceAtom,
  postGraduateDateOfAttendanceDateRangeAtom,
  postGraduateCourseDateOfAttendanceAtom,
  postGraduateCourseDateOfAttendanceDateRangeAtom,
  techVocDateOfAttendanceAtom,
  techVocDateOfAttendanceDateRangeAtom,
  techVocCourseDateOfAttendanceAtom,
  techVocCourseDateOfAttendanceDateRangeAtom,
  examinationTakenDateRangeAtom,
} from "../store/OnboardingStore";

import { examinationTakenAtom } from "../store/OnboardingStore";

import { useAtom, useAtomValue } from "jotai";
import FormFieldInput from "../../components/FormFieldInput";

const BackgroundOnboarding = ({ viewOnly }) => {
  const selectedTab = useAtomValue(selectedTabAtom);

  const handleUpdateValue = (data, index, property, value, setFunction) => {
    const updatedValue = data.map((obj) => {
      if (obj.id === index) {
        return { ...obj, [property]: value };
      }
      return obj;
    });
    setFunction(updatedValue);
  };

  // Family Background
  const [father, setFather] = useAtom(fatherAtom);
  const [mother, setMother] = useAtom(motherAtom);
  const [children, setChildren] = useAtom(childrenAtom);

  // Educational Background
  const [college, setCollege] = useAtom(collegeAtom);

  const [collegeDateOfAttendance, setCollegeDateOfAttendance] = useAtom(
    collegeDateOfAttendanceAtom
  );
  const [collegeCourseDateOfAttendance, setCollegeCourseDateOfAttendance] =
    useAtom(collegeCourseDateOfAttendanceAtom);

  const [
    collegeDateOfAttendanceDateRange,
    setCollegeDateOfAttendanceDateRange,
  ] = useAtom(collegeDateOfAttendanceDateRangeAtom);
  const [
    collegeCourseDateOfAttendanceDateRange,
    setCollegeCourseDateOfAttendanceDateRange,
  ] = useAtom(collegeCourseDateOfAttendanceDateRangeAtom);

  const [postGraduate, setPostGraduate] = useAtom(postGraduateAtom);

  const [postGraduateDateOfAttendance, setPostGraduateDateOfAttendance] =
    useAtom(postGraduateDateOfAttendanceAtom);
  const [
    postGraduateDateOfAttendanceDateRange,
    setPostGraduateDateOfAttendanceDateRange,
  ] = useAtom(postGraduateDateOfAttendanceDateRangeAtom);

  const [
    postGraduateCourseDateOfAttendance,
    setPostGraduateCourseDateOfAttendance,
  ] = useAtom(postGraduateCourseDateOfAttendanceAtom);
  const [
    postGraduateCourseDateOfAttendanceDateRange,
    setPostGraduateCourseDateOfAttendanceDateRange,
  ] = useAtom(postGraduateCourseDateOfAttendanceDateRangeAtom);

  const [techVocSpecial, setTechVocSpecial] = useAtom(techVocSpecialAtom);

  const [techVocDateOfAttendance, setTechVocDateOfAttendance] = useAtom(
    techVocDateOfAttendanceAtom
  );
  const [
    techVocDateOfAttendanceDateRange,
    setTechVocDateOfAttendanceDateRange,
  ] = useAtom(techVocDateOfAttendanceDateRangeAtom);

  const [techVocCourseDateOfAttendance, setTechVocCourseDateOfAttendance] =
    useAtom(techVocCourseDateOfAttendanceAtom);
  const [
    techVocCourseDateOfAttendanceDateRange,
    setTechVocCourseDateOfAttendanceDateRange,
  ] = useAtom(techVocCourseDateOfAttendanceDateRangeAtom);

  // Examination Taken
  const [examinationTaken, setExaminationTaken] = useAtom(examinationTakenAtom);

  const [examinationTakenDateRange, setExaminationTakenDateRange] = useAtom(
    examinationTakenDateRangeAtom
  );

  const family_background = (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <FormFieldInput
          
          type={"text"}
          label={"FATHER'S NAME"}
          value={father.name}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, name: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"number"}
          label={"AGE"}
          value={father.age}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, age: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"OCCUPATION"}
          value={father.occupation}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, occupation: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"COMPANY"}
          value={father.company}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, company: text };
            })
          }
          // isRequired={true}
        />
      </div>

      <div className="flex flex-col gap-5 mb-5">
        <FormFieldInput
          
          type={"text"}
          label={"MOTHER'S NAME"}
          value={mother.name}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, name: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"number"}
          label={"AGE"}
          value={mother.age}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, age: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"OCCUPATION"}
          value={mother.occupation}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, occupation: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"COMPANY"}
          value={mother.company}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, company: text };
            })
          }
          // isRequired={true}
        />
      </div>

      {children.map((child, c_index) => (
        <div key={"child" + c_index} className="flex flex-col gap-5">
          <FormFieldInput
            
            type={"text"}
            key={"name" + c_index}
            label={"NAME/S OF CHILDREN (if applicable)"}
            value={child.name}
            onValueChange={(text) => {
              handleUpdateValue(
                children,
                c_index + 1,
                "name",
                text,
                setChildren
              );
            }}
          />
          <FormFieldInput
            
            type={"number"}
            key={"age" + c_index}
            label={"AGE"}
            value={child.age}
            onValueChange={(text) => {
              handleUpdateValue(
                children,
                c_index + 1,
                "age",
                text,
                setChildren
              );
            }}
          />
          <FormFieldInput
            
            type={"text"}
            key={"civilStatus" + c_index}
            label={"CIVIL STATUS"}
            value={child.civil_status}
            onValueChange={(text) => {
              handleUpdateValue(
                children,
                c_index + 1,
                "civil_status",
                text,
                setChildren
              );
            }}
          />
          <FormFieldInput
            
            type={"text"}
            key={"occupation" + c_index}
            label={"OCCUPATION"}
            value={child.occupation}
            onValueChange={(text) => {
              handleUpdateValue(
                children,
                c_index + 1,
                "occupation",
                text,
                setChildren
              );
            }}
          />
          <FormFieldInput
            
            type={"text"}
            key={"company" + c_index}
            label={"COMPANY"}
            value={child.company}
            onValueChange={(text) => {
              handleUpdateValue(
                children,
                c_index + 1,
                "company",
                text,
                setChildren
              );
            }}
          />
        </div>
      ))}
    </>
  );

  const educational_background = (
    <>
      {/* COLLEGE */}
      <div className="flex flex-wrap justify-between gap-5 mb-5">
        <FormFieldInput
          
          type={"text"}
          label={"COLLEGE"}
          value={college.name}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, name: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"ADDRESS"}
          value={college.address}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, address: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"date"}
          label={"DATE OF ATTENDANCE"}
          value={collegeDateOfAttendance} // college.date_of_attendance
          onValueChange={setCollegeDateOfAttendance}
          // isRequired={true}
          showPastDate={true}
          withDate={true}
          dateRangeValue={collegeDateOfAttendanceDateRange}
          onDateRangeValueChange={setCollegeDateOfAttendanceDateRange}
        />
        <FormFieldInput
          
          type={"text"}
          label={"DEGREE/MAJOR"}
          value={college.degree_major}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"OTHER COURSES"}
          value={college.other_courses}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, other_courses: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"date"}
          label={"DATE OF ATTENDANCE"}
          value={collegeCourseDateOfAttendance} // college.course_date_of_attendance
          onValueChange={setCollegeCourseDateOfAttendance}
          // isRequired={true}
          showPastDate={true}
          withDate={true}
          dateRangeValue={collegeCourseDateOfAttendanceDateRange}
          onDateRangeValueChange={setCollegeCourseDateOfAttendanceDateRange}
        />
      </div>

      {/* POST GRADUATE */}
      <div className="flex flex-wrap justify-between gap-5 mb-5">
        <FormFieldInput
          
          type={"text"}
          label={"POST GRADUATE"}
          value={postGraduate.name}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, name: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"ADDRESS"}
          value={postGraduate.address}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, address: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"date"}
          label={"DATE OF ATTENDANCE"}
          value={postGraduateDateOfAttendance} // postGraduate.date_of_attendance
          onValueChange={setPostGraduateDateOfAttendance}
          // isRequired={true}
          showPastDate={true}
          withDate={true}
          dateRangeValue={postGraduateDateOfAttendanceDateRange}
          onDateRangeValueChange={setPostGraduateDateOfAttendanceDateRange}
        />
        <FormFieldInput
          
          type={"text"}
          label={"DEGREE/MAJOR"}
          value={postGraduate.degree_major}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"OTHER COURSES"}
          value={postGraduate.other_courses}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, other_courses: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"date"}
          label={"DATE OF ATTENDANCE"}
          value={postGraduateCourseDateOfAttendance} // postGraduate.course_date_of_attendance
          onValueChange={setPostGraduateCourseDateOfAttendance}
          // isRequired={true}
          showPastDate={true}
          withDate={true}
          dateRangeValue={postGraduateCourseDateOfAttendanceDateRange}
          onDateRangeValueChange={
            setPostGraduateCourseDateOfAttendanceDateRange
          }
        />
      </div>

      {/* TECHVOC */}
      <div className="flex flex-wrap justify-between gap-5 mb-5">
        <FormFieldInput
          
          type={"text"}
          label={"TECHNICAL/VOCATIONAL/SPECIAL COURSES"}
          value={techVocSpecial.name}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, name: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"ADDRESS"}
          value={techVocSpecial.address}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, address: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"date"}
          label={"DATE OF ATTENDANCE"}
          value={techVocDateOfAttendance} // techVocSpecial.course_date_of_attendance
          onValueChange={setTechVocDateOfAttendance}
          // isRequired={true}
          showPastDate={true}
          withDate={true}
          dateRangeValue={techVocDateOfAttendanceDateRange}
          onDateRangeValueChange={setTechVocDateOfAttendanceDateRange}
        />
        <FormFieldInput
          
          type={"text"}
          label={"DEGREE/MAJOR"}
          value={techVocSpecial.degree_major}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"text"}
          label={"OTHER COURSES"}
          value={techVocSpecial.other_courses}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, other_courses: text };
            })
          }
          // isRequired={true}
        />
        <FormFieldInput
          
          type={"date"}
          label={"DATE OF ATTENDANCE"}
          value={techVocCourseDateOfAttendance} // techVocSpecial.course_date_of_attendance
          onValueChange={setTechVocCourseDateOfAttendance}
          // isRequired={true}
          showPastDate={true}
          withDate={true}
          dateRangeValue={techVocCourseDateOfAttendanceDateRange}
          onDateRangeValueChange={setTechVocCourseDateOfAttendanceDateRange}
        />
      </div>
    </>
  );

  const examination_taken = (
    <>
      {examinationTaken.map((exam, e_index) => (
        <div
          key={"exam" + e_index}
          className="flex flex-wrap justify-between gap-5 mb-5"
        >
          <FormFieldInput
            
            type={"text"}
            key={"government_association" + e_index}
            label={"GOVERNMENT AGENCY/ASSOCIATION"}
            value={exam.government_association}
            onValueChange={(text) => {
              handleUpdateValue(
                examinationTaken,
                e_index + 1,
                "government_association",
                text,
                setExaminationTaken
              );
            }}
            // isRequired={true}
          />
          <FormFieldInput
            
            type={"date"}
            key={"date_taken" + e_index}
            label={"DATE TAKEN"}
            value={exam.date_taken}
            onValueChange={(text) => {
              handleUpdateValue(
                examinationTaken,
                e_index + 1,
                "date_taken",
                text,
                setExaminationTaken
              );
            }}
            // isRequired={true}
            showPastDate={true}
            withDate={true}
            dateRangeValue={examinationTakenDateRange[e_index]}
            onDateRangeValueChange={setExaminationTakenDateRange}
          />
          <FormFieldInput
            
            type={"text"}
            key={"certification" + e_index}
            label={"CERTIFICATION"}
            value={exam.certification}
            onValueChange={(text) => {
              handleUpdateValue(
                examinationTaken,
                e_index + 1,
                "certification",
                text,
                setExaminationTaken
              );
            }}
            // isRequired={true}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="h-fit flex flex-wrap justify-between gap-5 mt-4">
      {selectedTab === "family_background" && family_background}
      {selectedTab === "educational_background" && educational_background}
      {selectedTab === "examination_taken" && examination_taken}
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default BackgroundOnboarding;
