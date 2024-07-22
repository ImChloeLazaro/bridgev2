import { Avatar, Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { FaStar} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsFillBriefcaseFill } from "react-icons/bs";

const TeamLists = ({ selectedData, searchQuery, filter }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const findByName = () => {
      let resultObject = selectedData.find(
        (item) => item.name === filter.anchorKey
      );
      return resultObject;
    };

    const result = findByName();
    console.log(result);

    if (result) {
      const extractUniqueUsers = (data) => {
        const allUsersMap = new Map();
        data.heads.forEach((head) => {
          allUsersMap.set(head.sub, { ...head, teamLead: true });
        });
        data.members.forEach((member) => {
          if (!allUsersMap.has(member.sub)) {
            allUsersMap.set(member.sub, member);
          }
        });

        return Array.from(allUsersMap.values());
      };

      const uniqueUsers = extractUniqueUsers(result);
      setTeamMembers(uniqueUsers);
    } else {
      const extractUniqueUsers = (data) => {
        const allUsersMap = new Map();
        data.heads.forEach((head) => {
          allUsersMap.set(head.sub, { ...head, teamLead: true });
        });
        data.members.forEach((member) => {
          if (!allUsersMap.has(member.sub)) {
            allUsersMap.set(member.sub, member);
          }
        });

        return Array.from(allUsersMap.values());
      };

      const uniqueUsers = extractUniqueUsers(selectedData[0]);
      setTeamMembers(uniqueUsers);
    }
  }, [selectedData, filter.anchorKey]);

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredMembers !== null || filteredMembers.length > 0 ? (
    <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-2">
      {filteredMembers.map((member, index) => (
        <Card className="p-2 flex flex-row  items-center bg-white-default rounded-none md:rounded-md" key={index}>
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex justify-start items-center gap-2">
                <Avatar src={member?.picture} alt="user" />
                <p className="font-semibold text-xl">{member.name}</p>
              </div>

              {member?.teamLead && (
                <div>
                  <FaStar className="text-[#EF8B16]" />
                </div>
              )}
            </div>

            <div className="leading-snug">
              <p className="flex justify-start items-center text-base"><IoMdMail size={15} className="mr-2"/> {member?.email}</p>
              <p className="flex justify-start items-center"><BsFillBriefcaseFill size={14} className="mr-2"/> {member?.position}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  ) : (
    <div>No Members</div>
  );
};

export default TeamLists;
