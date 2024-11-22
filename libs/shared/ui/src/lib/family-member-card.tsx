export type FamilyMember = {
  MemberPartitionKey: string;
  mNameFirst: string;
  mNameCurrentMiddle: string;
  mNameCurrentLast: string;
  children: FamilyMember[];
  spouseName?: FamilyMember;
};

type FamilyMemberCardProps = {
  familyMember: FamilyMember;
};
export function FamilyMemberCard({ familyMember }: FamilyMemberCardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-yellow-400">
      <h1 className="flex justify-center">{`${familyMember.mNameFirst} ${familyMember.mNameCurrentLast}`}</h1>
      <h3>Children:</h3>
      {familyMember.children.map((member) => {
        return <div>{`${member.mNameFirst} ${member.mNameCurrentLast}`}</div>;
      })}
    </div>
  );
}

export default FamilyMemberCard;
