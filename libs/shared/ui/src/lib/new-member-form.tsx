import { useState } from 'react';
import { FamilyMember, FamilyMemberCard } from '@king-family/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

/// __________ Upload New Member to DynamoDB __________ ///
function useCreateMember() {
  return useMutation({
    mutationFn: async (data: FamilyMember) => {
      const response = await axios.put(
        'https://7dpjyj0du2.execute-api.us-east-2.amazonaws.com/items',
        data
      );
      return response.data;
    },
    onError: (error: AxiosError) => {
      console.error('Error Updating. Blah! Bluh-Blah!', error);
    },
  });
}

export function NewMemberForm() {
  const [firstName, setFirstName] = useState('');
  const [currentMiddleName, setCurrentMiddleName] = useState('');
  const [currentLastName, setcurrentLastName] = useState('');

  /// __________ Function Call to Add Member to DynamoDB __________ ///
  function CreateNewMember() {
    updateMember({
      MemberPartitionKey: uuidv4(),
      mNameCurrentLast: currentLastName,
      mNameFirst: firstName,
      children: [],
      mNameCurrentMiddle: currentMiddleName,
    });
  }

  const { mutate: updateMember, isPending } = useCreateMember();

  return (
    <div>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="m-2 pl-3 rounded-lg"
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
      />
      <input
        value={currentMiddleName}
        onChange={(e) => setCurrentMiddleName(e.target.value)}
        className="m-2 pl-3 rounded-lg"
        type="text"
        name="CurrentMiddleName"
        id="CurrentMiddleName"
        placeholder="Current Middle Name"
      />
      <input
        value={currentLastName}
        onChange={(e) => setcurrentLastName(e.target.value)}
        className="m-2 pl-3 rounded-lg"
        type="text"
        name="currentLastName"
        id="currentLastName"
        placeholder="Current Last Name"
      />
      {isPending && <span>....Creating New Member</span>}
      {!isPending && (
        <button
          type="button"
          onClick={CreateNewMember}
          className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
        >
          <svg
            className="w-5 h-5 me-2 -ms-1"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="apple"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
            ></path>
          </svg>
          Save New Member
        </button>
      )}
    </div>
  );
}

export default NewMemberForm;
