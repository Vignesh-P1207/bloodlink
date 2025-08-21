"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { InventoryItem } from "@/lib/types";


const hospitalRequestSchema = z.object({
  hospitalName: z.string().min(2, "Hospital name is required."),
  requestBloodGroup: z.string({ required_error: "Please select a blood group." }),
  requestComponent: z.string({ required_error: "Please select a component." }),
  requestUrgency: z.string({ required_error: "Please select an urgency level." }),
  requestQuantity: z.coerce.number().min(1).max(50),
  requestNotes: z.string().optional(),
});

const inventoryData: InventoryItem[] = [
    { component: 'PRBC', bloodGroup: 'A+', units: 12, expiryDate: '2024-07-15' },
    { component: 'FFP', bloodGroup: 'O-', units: 8, expiryDate: '2024-07-10' },
    { component: 'Platelets', bloodGroup: 'B+', units: 5, expiryDate: '2024-06-30' },
    { component: 'Whole Blood', bloodGroup: 'AB-', units: 3, expiryDate: '2024-07-20' },
    { component: 'PRBC', bloodGroup: 'Bombay (hh)', units: 1, expiryDate: '2024-08-01' },
];

export default function HospitalPortal() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof hospitalRequestSchema>>({
    resolver: zodResolver(hospitalRequestSchema),
    defaultValues: {
      hospitalName: "",
      requestQuantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof hospitalRequestSchema>) {
    console.log(values);
    toast({
      title: "Request Submitted",
      description: "Blood request submitted successfully. Donors will be alerted shortly.",
    });
    form.reset();
  }

  return (
    <section aria-label="Hospital Portal Section" className="glass-container p-10 shadow-lg" id="hospital" tabIndex={0}>
      <h2 className="text-5xl font-extrabold font-headline text-red-300 mb-10 text-center drop-shadow-lg">
        Hospital Portal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <div>
          <h3 className="text-3xl font-bold font-headline mb-6 text-red-400 drop-shadow-md">
            Raise Blood Request
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 max-w-md mx-auto">
              <FormField
                control={form.control}
                name="hospitalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Hospital Name</FormLabel>
                    <FormControl>
                      <Input placeholder="City Hospital" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestBloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Blood Group Needed</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="form-input"><SelectValue placeholder="Select blood group" /></SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-red-900 text-white">
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Bombay (hh)"].map(group => <SelectItem key={group} value={group}>{group}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestComponent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Blood Component</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="form-input"><SelectValue placeholder="Select component" /></SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-red-900 text-white">
                        <SelectItem value="Whole Blood">Whole Blood</SelectItem>
                        <SelectItem value="PRBC">PRBC (Packed Red Blood Cells)</SelectItem>
                        <SelectItem value="FFP">FFP (Fresh Frozen Plasma)</SelectItem>
                        <SelectItem value="Platelets">Platelets</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestUrgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Urgency Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="form-input"><SelectValue placeholder="Select urgency" /></SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-red-900 text-white">
                        <SelectItem value="Routine">Routine</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Quantity (Units)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="50" placeholder="e.g. 2" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Crossmatch status, patient info, etc." {...field} className="form-input" rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="btn-gradient w-full text-white font-extrabold py-4 h-auto text-base rounded-xl shadow-lg transition duration-300">
                Submit Request
              </Button>
            </form>
          </Form>
        </div>
        <div>
            <h3 className="text-3xl font-bold font-headline mb-6 text-red-400 drop-shadow-md text-center md:text-left">
                Current Blood Inventory
            </h3>
            <div className="overflow-x-auto border-4 border-red-600 rounded-3xl shadow-2xl max-w-full bg-white bg-opacity-10 backdrop-blur-sm">
                <Table className="min-w-full text-left text-sm text-red-200">
                    <TableHeader className="bg-red-700 bg-opacity-80 font-bold uppercase tracking-wide">
                        <TableRow>
                            <TableHead className="px-8 py-4 border-b border-red-600">Component</TableHead>
                            <TableHead className="px-8 py-4 border-b border-red-600">Blood Group</TableHead>
                            <TableHead className="px-8 py-4 border-b border-red-600">Units Available</TableHead>
                            <TableHead className="px-8 py-4 border-b border-red-600">Expiry Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventoryData.map((item, index) => (
                            <TableRow key={index} className={`border-b border-red-500 hover:bg-red-800 hover:bg-opacity-50 transition ${index % 2 !== 0 ? 'bg-red-900 bg-opacity-20' : ''}`}>
                                <TableCell className="px-8 py-4 font-semibold">{item.component}</TableCell>
                                <TableCell className="px-8 py-4">{item.bloodGroup}</TableCell>
                                <TableCell className="px-8 py-4 font-semibold text-red-400">{item.units}</TableCell>
                                <TableCell className="px-8 py-4">{item.expiryDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <p className="mt-6 text-red-300 text-sm italic select-none text-center md:text-left max-w-md mx-auto md:mx-0">
                Inventory is updated in real-time and linked to donor availability and hospital requests.
            </p>
        </div>
      </div>
    </section>
  );
}
