
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Droplet, MapPin, Clock, CalendarCheck, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import NavBar from "@/components/NavBar";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 17 && num <= 65;
  }, { message: "You must be between 17 and 65 years old to donate" }),
  weight: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 50;
  }, { message: "You must weigh at least 50kg to donate" }),
  gender: z.string({
    required_error: "Please select your gender",
  }),
  bloodType: z.string({
    required_error: "Please select your blood type",
  }),
  donationCenter: z.string({
    required_error: "Please select a donation center",
  }),
  donationDate: z.date({
    required_error: "Please select a date for your donation",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot",
  }),
  healthConsent: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you are in good health",
  }),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data
const donationCenters = [
  { id: "center-1", name: "Central Blood Bank", address: "123 Main St", slots: 12 },
  { id: "center-2", name: "Memorial Hospital", address: "456 Park Ave", slots: 8 },
  { id: "center-3", name: "Community Center", address: "789 Oak Rd", slots: 15 },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "01:00 PM", "02:00 PM", 
  "03:00 PM", "04:00 PM", "05:00 PM"
];

const DonationForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      weight: "",
      gender: "",
      bloodType: "",
      donationCenter: "",
      donationDate: undefined,
      timeSlot: "",
      healthConsent: false,
      contactPhone: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Appointment Scheduled!",
        description: `Your blood donation is scheduled for ${format(data.donationDate, "MMMM d, yyyy")} at ${data.timeSlot}.`,
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Unable to schedule your appointment. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const step1Fields = ["fullName", "age", "weight", "gender", "bloodType"];
      const result = await form.trigger(step1Fields as any);
      if (result) setStep(2);
    } else if (step === 2) {
      const step2Fields = ["donationCenter", "donationDate", "timeSlot"];
      const result = await form.trigger(step2Fields as any);
      if (result) setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Schedule Blood Donation</h1>
            <p className="text-muted-foreground mt-2">
              Thank you for your willingness to donate blood and save lives
            </p>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center"
                  onClick={() => i < step ? setStep(i) : null}
                >
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm mb-2 transition-colors",
                      i < step 
                        ? "bg-blood text-white cursor-pointer" 
                        : i === step 
                          ? "bg-blood-light text-blood border-2 border-blood" 
                          : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {i < step ? <CheckCircle className="h-5 w-5" /> : i}
                  </div>
                  <span 
                    className={cn(
                      "text-xs font-medium",
                      i <= step ? "text-blood" : "text-muted-foreground"
                    )}
                  >
                    {i === 1 ? "Personal Info" : i === 2 ? "Schedule" : "Confirm"}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-1 mt-4 rounded-full overflow-hidden">
              <div 
                className="bg-blood h-full transition-all" 
                style={{ width: `${(step - 1) * 50}%` }}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 
                  ? "Personal Information" 
                  : step === 2 
                    ? "Appointment Details" 
                    : "Confirmation"
                }
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? "Please provide your personal details" 
                  : step === 2 
                    ? "Select your preferred donation center and time" 
                    : "Review and confirm your appointment"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your age" type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                You must be between 17-65 years old
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your weight" type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                You must weigh at least 50kg
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="male" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Male</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="female" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Female</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Other</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your blood type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {bloodTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select "Unknown" if you don't know your blood type
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormDescription>
                              We'll send you a reminder before your appointment
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="donationCenter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Donation Center</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a donation center" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {donationCenters.map((center) => (
                                  <SelectItem key={center.id} value={center.id}>
                                    <div className="flex flex-col">
                                      <span>{center.name}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {center.address} • {center.slots} slots available
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select your preferred location for blood donation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="donationDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    const today = new Date();
                                    // Disable dates in the past and more than 30 days in the future
                                    return (
                                      date < today ||
                                      date > new Date(today.setDate(today.getDate() + 30))
                                    );
                                  }}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Select a date within the next 30 days
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Slot</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose your preferred time for donation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Name</p>
                            <p className="text-sm">{form.getValues().fullName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Age</p>
                            <p className="text-sm">{form.getValues().age} years</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Weight</p>
                            <p className="text-sm">{form.getValues().weight} kg</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Blood Type</p>
                            <p className="text-sm">{form.getValues().bloodType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Gender</p>
                            <p className="text-sm text-capitalize">{form.getValues().gender}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Contact</p>
                            <p className="text-sm">{form.getValues().contactPhone}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 text-blood mr-2" />
                            <p className="text-sm font-medium">
                              {donationCenters.find(c => c.id === form.getValues().donationCenter)?.name || ''}
                            </p>
                          </div>
                          <p className="text-sm ml-6 text-muted-foreground">
                            {donationCenters.find(c => c.id === form.getValues().donationCenter)?.address || ''}
                          </p>
                        </div>

                        <div className="flex space-x-6 pt-2">
                          <div className="flex items-center">
                            <CalendarCheck className="h-4 w-4 text-blood mr-2" />
                            <p className="text-sm">
                              {form.getValues().donationDate ? format(form.getValues().donationDate, "MMMM d, yyyy") : ''}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-blood mr-2" />
                            <p className="text-sm">{form.getValues().timeSlot}</p>
                          </div>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="healthConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Health Confirmation</FormLabel>
                              <FormDescription>
                                I confirm that I am in good health, have not had any recent illness, and meet the eligibility criteria for blood donation.
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-blood-light/30 p-4 rounded-lg">
                        <div className="flex items-start">
                          <Droplet className="h-5 w-5 text-blood mr-3 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium mb-1">Important Information</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Please bring a valid ID for verification</li>
                              <li>• Eat a healthy meal before your appointment</li>
                              <li>• Stay hydrated before and after donation</li>
                              <li>• The donation process takes about 30-45 minutes</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}
                    
                    {step < 3 ? (
                      <Button type="button" onClick={nextStep}>
                        Continue
                      </Button>
                    ) : (
                      <Button 
                        type="button" 
                        disabled={submitting || !form.getValues().healthConsent}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          "Schedule Appointment"
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
