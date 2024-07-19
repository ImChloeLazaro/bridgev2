import { Link } from "@nextui-org/react";
import ClientCell from "./Components/ClientCell";

export const subTeamData = [
  {
    name: "Alpha Team",
    head: {
      sub: "h1",
      name: "Alice Smith",
      email: "alice.smith@example.com",
      picture: "https://example.com/pic/alice.jpg",
    },
    members: [
      {
        sub: "m1",
        name: "John Doe",
        email: "john.doe@example.com",
        picture: "https://example.com/pic/john.jpg",
        position: "Developer",
        status: "active",
        employment_status: "Full-time",
      },
      {
        sub: "m2",
        name: "Jane Roe",
        email: "jane.roe@example.com",
        picture: "https://example.com/pic/jane.jpg",
        position: "Designer",
        status: "active",
        employment_status: "Part-time",
      },
    ],
    client: [
      {
        _id: "c1",
        name: "Client A",
        email: "clienta@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
  {
    name: "Beta Team",
    head: {
      sub: "h2",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      picture: "https://example.com/pic/bob.jpg",
    },
    members: [
      {
        sub: "m3",
        name: "Tom Brown",
        email: "tom.brown@example.com",
        picture: "https://example.com/pic/tom.jpg",
        position: "QA Engineer",
        status: "active",
        employment_status: "Contractor",
      },
      {
        sub: "m4",
        name: "Lucy Green",
        email: "lucy.green@example.com",
        picture: "https://example.com/pic/lucy.jpg",
        position: "Project Manager",
        status: "active",
        employment_status: "Full-time",
      },
    ],
    client: [
      {
        _id: "c2",
        name: "Client B",
        email: "clientb@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
  {
    name: "Gamma Team",
    head: {
      sub: "h3",
      name: "Charlie Lee",
      email: "charlie.lee@example.com",
      picture: "https://example.com/pic/charlie.jpg",
    },
    members: [
      {
        sub: "m5",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        picture: "https://example.com/pic/emily.jpg",
        position: "DevOps Engineer",
        status: "active",
        employment_status: "Full-time",
      },
      {
        sub: "m6",
        name: "James Wilson",
        email: "james.wilson@example.com",
        picture: "https://example.com/pic/james.jpg",
        position: "Backend Developer",
        status: "active",
        employment_status: "Part-time",
      },
    ],
    client: [
      {
        _id: "c3",
        name: "Client C",
        email: "clientc@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
  {
    name: "Delta Team",
    head: {
      sub: "h4",
      name: "David White",
      email: "david.white@example.com",
      picture: "https://example.com/pic/david.jpg",
    },
    members: [
      {
        sub: "m7",
        name: "Sophia Taylor",
        email: "sophia.taylor@example.com",
        picture: "https://example.com/pic/sophia.jpg",
        position: "Data Scientist",
        status: "active",
        employment_status: "Full-time",
      },
      {
        sub: "m8",
        name: "Liam Harris",
        email: "liam.harris@example.com",
        picture: "https://example.com/pic/liam.jpg",
        position: "Frontend Developer",
        status: "active",
        employment_status: "Intern",
      },
    ],
    client: [
      {
        _id: "c4",
        name: "Client D",
        email: "clientd@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
  {
    name: "Epsilon Team",
    head: {
      sub: "h5",
      name: "Eve Martin",
      email: "eve.martin@example.com",
      picture: "https://example.com/pic/eve.jpg",
    },
    members: [
      {
        sub: "m9",
        name: "Olivia Moore",
        email: "olivia.moore@example.com",
        picture: "https://example.com/pic/olivia.jpg",
        position: "Product Manager",
        status: "active",
        employment_status: "Full-time",
      },
      {
        sub: "m10",
        name: "Noah Anderson",
        email: "noah.anderson@example.com",
        picture: "https://example.com/pic/noah.jpg",
        position: "UX Designer",
        status: "active",
        employment_status: "Part-time",
      },
    ],
    client: [
      {
        _id: "c5",
        name: "Client E",
        email: "cliente@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
  {
    name: "Zeta Team",
    head: {
      sub: "h6",
      name: "Frank Thomas",
      email: "frank.thomas@example.com",
      picture: "https://example.com/pic/frank.jpg",
    },
    members: [
      {
        sub: "m11",
        name: "Ava Thompson",
        email: "ava.thompson@example.com",
        picture: "https://example.com/pic/ava.jpg",
        position: "Security Analyst",
        status: "active",
        employment_status: "Full-time",
      },
      {
        sub: "m12",
        name: "William Martinez",
        email: "william.martinez@example.com",
        picture: "https://example.com/pic/william.jpg",
        position: "Business Analyst",
        status: "active",
        employment_status: "Part-time",
      },
    ],
    client: [
      {
        _id: "c6",
        name: "Client F",
        email: "clientf@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
  {
    name: "Eta Team",
    head: {
      sub: "h7",
      name: "Grace Garcia",
      email: "grace.garcia@example.com",
      picture: "https://example.com/pic/grace.jpg",
    },
    members: [
      {
        sub: "m13",
        name: "Isabella Robinson",
        email: "isabella.robinson@example.com",
        picture: "https://example.com/pic/isabella.jpg",
        position: "Data Engineer",
        status: "active",
        employment_status: "Full-time",
      },
      {
        sub: "m14",
        name: "Mason Lee",
        email: "mason.lee@example.com",
        picture: "https://example.com/pic/mason.jpg",
        position: "Scrum Master",
        status: "active",
        employment_status: "Part-time",
      },
    ],
    client: [
      {
        _id: "c7",
        name: "Client G",
        email: "clientg@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
  {
    name: "Theta Team",
    head: {
      sub: "h8",
      name: "Henry Young",
      email: "henry.young@example.com",
      picture: "https://example.com/pic/henry.jpg",
    },
    members: [
      {
        sub: "m15",
        name: "Mia Walker",
        email: "mia.walker@example.com",
        picture: "https://example.com/pic/mia.jpg",
        position: "Marketing Specialist",
        status: "active",
        employment_status: "Full-time",
      },
      {
        sub: "m16",
        name: "Logan Allen",
        email: "logan.allen@example.com",
        picture: "https://example.com/pic/logan.jpg",
        position: "Content Strategist",
        status: "active",
        employment_status: "Contractor",
      },
    ],
    client: [
      {
        _id: "c8",
        name: "Client H",
        email: "clienth@example.com",
      },
    ],
    status: "active",
    created_at: new Date(),
  },
];
export const columnData = [
  {
    header: ({ table }) => (
      <input
        type='checkbox'
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <div className='w-full flex h-full items-center'>
        <input
          className='border h-[12px] w-full'
          type='checkbox'
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
    disableSortBy: true,
    accessorKey: "select",
    id: "select",
    size: 5,
  },
  {
    Header: "Client",
    id: "client",
    accessorKey: "client",
    cell: ClientCell,
   
  },
  {
    Header: "Team Lead",
    id: "head",
    accessorKey: "head",
    cell: ({ row }) => <div>{row?.original?.head?.name}</div>,
  },
  {
    Header: "Members",
    id: "members",
    accessorKey: "members",
    cell: ({ row }) => (
      <div className='flex flex-wrap w-full items-center'>
        <div className='relative w-9 h-9'>
          {row?.original?.members?.map((member, index) => (
            <div
              key={index}
              className='absolute w-8 h-8 rounded-full'
              title={member.name}
              style={{ right: `${index * -20}px`, zIndex: index }}
            >
              <img
                className='rounded-full w-full h-full'
                src={member.picture}
                alt='user'
              />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export const teamColumnData = [
  {
    header: ({ table }) => (
      <input
        type='checkbox'
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <div className='w-full flex h-full items-center'>
        <input
          className='border h-[12px] w-full'
          type='checkbox'
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
    disableSortBy: true,
    accessorKey: "select",
    id: "select",
    size: 5,
  },
  {
    Header: "Team",
    id: "name",
    accessorKey: "name",
    cell: ({ row }) => <p>{row?.original?.name}</p>,
  },
  {
    Header: "Supervisor",
    id: "heads",
    accessorKey: "heads",
    cell: ({ row }) => (
      <div>
        {row?.original?.heads?.map((supervisor, index) => (
          <div key={index}>{supervisor.name}</div>
        ))}
      </div>
    ),
  },
  {
    Header: "Client",
    id: "client",
    accessorKey: "client",
    cell: ({ row }) => (
      <div>
        {row?.original?.client?.map((client, index) => (
          <p key={index}>{client.name}</p>
        ))}
      </div>
    ),
  },

  {
    Header: "Members",
    id: "members",
    accessorKey: "members",
    cell: ({ row }) => (
      <div className='flex flex-wrap w-full items-center'>
        <div className='relative w-9 h-9'>
          {row?.original?.members?.map((member, index) => (
            <div
              key={index}
              className='absolute w-8 h-8 rounded-full'
              title={member.name}
              style={{ right: `${index * -20}px`, zIndex: index }}
            >
              <img
                className='rounded-full w-full h-full'
                src={member.picture}
                alt='user'
              />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];
