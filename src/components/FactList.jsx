import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FactList = ({ facts }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Added Facts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fact</TableHead>
            <TableHead>Person</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facts.map((fact, index) => (
            <TableRow key={index}>
              <TableCell>{fact.fact}</TableCell>
              <TableCell className="capitalize">{fact.person}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FactList;
