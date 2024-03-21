import {
  childrenAtom,
  collegeAtom,
  fatherAtom,
  motherAtom,
  postGraduateAtom,
  selectedTabAtom,
  techVocSpecialAtom,
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
  const [postGraduate, setPostGraduate] = useAtom(postGraduateAtom);
  const [techVocSpecial, setTechVocSpecial] = useAtom(techVocSpecialAtom);

  // Examination Taken
  const [examinationTaken, setExaminationTaken] = useAtom(examinationTakenAtom);

  const family_background = (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <FormFieldInput
          isDisabled={viewOnly}
          label={"FATHER'S NAME"}
          value={father.name}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, name: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"AGE"}
          value={father.age}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, age: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"OCCUPATION"}
          value={father.occupation}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, occupation: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"COMPANY"}
          value={father.company}
          onValueChange={(text) =>
            setFather((prev) => {
              return { ...prev, company: text };
            })
          }
          isRequired={true}
        />
      </div>

      <div className="flex flex-col gap-5 mb-5">
        <FormFieldInput
          isDisabled={viewOnly}
          label={"MOTHER'S NAME"}
          value={mother.name}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, name: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"AGE"}
          value={mother.age}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, age: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"OCCUPATION"}
          value={mother.occupation}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, occupation: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"COMPANY"}
          value={mother.company}
          onValueChange={(text) =>
            setMother((prev) => {
              return { ...prev, company: text };
            })
          }
          isRequired={true}
        />
      </div>

      {children.map((child, c_index) => (
        <div key={"child" + c_index} className="flex flex-col gap-5">
          <FormFieldInput
            isDisabled={viewOnly}
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
            isDisabled={viewOnly}
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
            isDisabled={viewOnly}
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
            isDisabled={viewOnly}
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
            isDisabled={viewOnly}
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
      <div className="flex flex-wrap justify-between gap-5 mb-5">
        <FormFieldInput
          isDisabled={viewOnly}
          label={"COLLEGE"}
          value={college.name}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, name: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"ADDRESS"}
          value={college.address}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, address: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DATE OF ATTENDANCE"}
          value={college.date_of_attendance}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, date_of_attendance: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DEGREE/MAJOR"}
          value={college.degree_major}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"OTHER COURSES"}
          value={college.other_courses}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, other_courses: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DATE OF ATTENDANCE"}
          value={college.course_date_of_attendance}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, course_date_of_attendance: text };
            })
          }
          isRequired={true}
        />
      </div>
      <div className="flex flex-wrap justify-between gap-5 mb-5">
        <FormFieldInput
          isDisabled={viewOnly}
          label={"POST GRADUATE"}
          value={postGraduate.name}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, name: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"ADDRESS"}
          value={postGraduate.address}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, address: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DATE OF ATTENDANCE"}
          value={postGraduate.date_of_attendance}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, date_of_attendance: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DEGREE/MAJOR"}
          value={postGraduate.degree_major}
          onValueChange={(text) =>
            setPostGraduate((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"OTHER COURSES"}
          value={college.degree_major}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DATE OF ATTENDANCE"}
          value={college.date_of_attendance}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, date_of_attendance: text };
            })
          }
          isRequired={true}
        />
      </div>
      <div className="flex flex-wrap justify-between gap-5 mb-5">
        <FormFieldInput
          isDisabled={viewOnly}
          label={"TECHNICAL/VOCATIONAL/SPECIAL COURSES"}
          value={techVocSpecial.name}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, name: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"ADDRESS"}
          value={techVocSpecial.address}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, address: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DATE OF ATTENDANCE"}
          value={techVocSpecial.date_of_attendance}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, date_of_attendance: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DEGREE/MAJOR"}
          value={techVocSpecial.degree_major}
          onValueChange={(text) =>
            setTechVocSpecial((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"OTHER COURSES"}
          value={college.degree_major}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, degree_major: text };
            })
          }
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"DATE OF ATTENDANCE"}
          value={college.date_of_attendance}
          onValueChange={(text) =>
            setCollege((prev) => {
              return { ...prev, date_of_attendance: text };
            })
          }
          isRequired={true}
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
            isDisabled={viewOnly}
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
            isRequired={true}
          />
          <FormFieldInput
            isDisabled={viewOnly}
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
            isRequired={true}
            withDate={true}
            date={exam.date_taken}
            onDateChange={{
              index: e_index + 1,
              setFunction: setExaminationTaken,
            }}
          />
          <FormFieldInput
            isDisabled={viewOnly}
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
            isRequired={true}
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
