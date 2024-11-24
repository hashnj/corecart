import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import { B_Url } from "@/config";


const addressSchema = z.object({
  type: z.enum(["home", "work"]),
  address: z.string().min(1, "Address Landmark required"),
  pin: z.string().min(3, "Postal code must be at least 3 digits").max(6,'Postal code greater than 6 digits'),
  city: z.string().min(1,"City is required"),
  state: z.string().min(1,"State is required"),
  country: z.string().min(1,"Country is required"),
  def: z.boolean(),
});

type AddressFormData = z.infer<typeof addressSchema>;

export const AddAddress = () => {
  // const [isAddVisible, setIsAddVisible] = useState(false);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "home",
      address: "",
      pin: "",
      city: "",
      state: "",
      country: "",
      def: false,
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      const response = await fetch(`${B_Url}/user/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) console.log(response);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className={`transition-all p-8 px-14 duration-300`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className='text-primary text-2xl font-bold'> Add Address </div>

          {/* Select Address Type */}
          <div>
            <label className="text-base text-text">Set address type: </label>
            <select
              {...form.register("type")}
              className="ml-1 w-[49%] focus:ring-primary bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
            >
              <option value="home">Home Address</option>
              <option value="work">Work Address</option>
            </select>
          </div>

          
          <CustomInput control={form.control} name="address" label="Address" placeholder="Landmark" />
          <div className="flex gap-4 w-full">
          <CustomInput control={form.control} name="pin" label="Postal Code" placeholder="Postal code" />
          <CustomInput control={form.control} name="city" label="City" placeholder="Enter city" />
          </div>
          
          <CustomInput control={form.control} name="state" label="State" placeholder="Enter state" />
          <CustomInput control={form.control} name="country" label="Country" placeholder="Enter country" />

          <label className="flex items-center">
            <input
              type="checkbox"
              {...form.register("def")}
              className="rounded focus:ring-primary text-primary"
            />
            <span className="text-base ml-2">Set as default address</span>
          </label>

          {/* Form Buttons */}
          <div className="flex justify-around text-xl">
            <button
              type="button"
              onClick={() =>{}}
              className="h-10 w-full mx-1 bg-backgrounds/50 rounded border text-center"
            >
              Cancel
            </button>
            <button type="submit" className="bg-primary w-full mx-1 h-10 rounded text-white" >
              Add
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
