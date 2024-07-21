import React, { useEffect, useState } from "react";

const TeamLists = ({ selectedData }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
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

    const uniqueUsers = extractUniqueUsers(selectedData);
    setTeamMembers(uniqueUsers);
  }, [selectedData]);
  return teamMembers !== null || teamMembers.length > 0 ? (
    <div className='grid grid-cols-2 gap-5'>
      {teamMembers.map((member, index) => (
        <div
          className='border rounded-lg p-3 flex flex-row  items-center'
          key={index}
        >
          <div className='w-20 h-20'>
            <img
              src={member?.picture}
              alt='user'
              className='w-20 h-20 rounded-full'
            />
          </div>
          <div className='flex flex-col justify-center p-2 w-full'>
            <div className='flex flex-row items-center w-full  justify-between'>
              <p className='font-semibold text-xl'>{member.name}</p>
              {member?.teamLead && (
                <div className='p-2 rounded-md text-white-default border w-10 bg-orange-600'>
                  Head
                </div>
              )}
            </div>
            <p>{member?.email}</p>
            <p>{member?.position}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>No Members</div>
  );
};

export default TeamLists;
