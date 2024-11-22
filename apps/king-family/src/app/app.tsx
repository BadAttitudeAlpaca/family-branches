import { FamilyMember, FamilyMemberCard, NewMemberForm } from '@king-family/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

/// __________ Get Member Data from DynamoDB __________ ///
function useQueryMemberData() {
  return useQuery({
    queryKey: ['membersData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://7dpjyj0du2.execute-api.us-east-2.amazonaws.com/items'
      );
      console.log('MemberData Pulled: ', response);
      const data = response.data as FamilyMember[];
      return data.map((famember) => {
        famember.children = [];
        return famember;
      });
    },
  });
}

export function App() {
  const { data: memberTable, isLoading } = useQueryMemberData();
  const title = 'King Familiars';

  return (
    <div className="wrapper bg-blue-400">
      <div className="container">
        <div id="welcome bg-yellow-200">
          <h1>
            <span> Hello there, </span>
            {title} 👋
          </h1>
          <NewMemberForm />
          {isLoading && <span>....Loading Members' Table Info</span>}
          {!isLoading &&
            memberTable &&
            memberTable.map((member) => {
              return (
                <div className="m-2" key={member.MemberPartitionKey}>
                  <FamilyMemberCard familyMember={member} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
