import GroupPage from '@/components/products/group/GroupPage';
import { getGatheringDetail } from '@/lib/gatherings/gatherings';

export default async function Group({
  params,
}: {
  params: { groupId: string };
}) {
  const numericId = Number(params.groupId);
  const data = await getGatheringDetail(numericId);

  return <GroupPage initialData={data} id={numericId} />;
}
