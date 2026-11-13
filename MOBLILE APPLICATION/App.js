import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Pressable, TextInput, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

const NAVY = "#102A5C", GREEN = "#5B8F2A", CREAM = "#F5F3EA";
const courses = [
  { id: "1", name: "Pet Care Essentials", price: 850, detail: "Everyday care, wellbeing and responsible ownership." },
  { id: "2", name: "Introduction to Dog Training", price: 1200, detail: "Positive training principles and basic behaviour." },
  { id: "3", name: "Animal Health and Safety", price: 1500, detail: "Introductory safe handling and wellbeing concepts." },
  { id: "4", name: "Pet Sitting Fundamentals", price: 950, detail: "Responsibilities and professional pet-sitting habits." }
];

export default function App() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState("Home");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const summary = useMemo(() => {
    const chosen = courses.filter(c => selected.includes(c.id));
    const subtotal = chosen.reduce((s, c) => s + c.price, 0);
    const discount = chosen.length === 2 ? 5 : chosen.length === 3 ? 10 : chosen.length > 3 ? 15 : 0;
    return { count: chosen.length, subtotal, discount, total: subtotal * (1 - discount / 100) };
  }, [selected]);
  const toggle = id => setSelected(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const submit = () => {
    if (name.trim().length < 2) return Alert.alert("Check your name", "Enter at least two characters.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return Alert.alert("Check your email", "Enter a valid email address.");
    Alert.alert("Demo request validated", "Thank you. This demonstration does not send or store your details.");
    setName(""); setEmail(""); setMessage("");
  };
  const Button = ({ label, onPress, secondary=false }) => <Pressable onPress={onPress} style={[styles.button, secondary && styles.secondary]}><Text style={[styles.buttonText, secondary && styles.secondaryText]}>{label}</Text></Pressable>;
  return <SafeAreaView style={styles.safe}><StatusBar style="dark" /><View style={styles.header}><Text style={styles.brand}>🐾 Pawsitive</Text><Text style={styles.subbrand}>PET ACADEMY</Text></View>
    <View style={styles.nav}>{["Home","Courses","Quote"].map(p=><Pressable key={p} onPress={()=>setPage(p)}><Text style={[styles.navText,page===p&&styles.active]}>{p}</Text></Pressable>)}</View>
    <ScrollView contentContainerStyle={styles.content}>
      {page==="Home" && <><Text style={styles.eyebrow}>DURBAN · ESTABLISHED 2023</Text><Text style={styles.title}>Better care starts with knowledge.</Text><Text style={styles.body}>Build confidence, develop practical skills and make a positive difference in the lives of animals.</Text><Text style={styles.tagline}>Learn · Care · Train · Change Lives</Text><Button label="Explore courses" onPress={()=>setPage("Courses")} /></>}
      {page==="Courses" && <><Text style={styles.title}>Explore courses</Text><Text style={styles.body}>Illustrative course options and fees. Confirm final details with your project group.</Text>{courses.map(c=><Pressable key={c.id} onPress={()=>toggle(c.id)} style={[styles.course,selected.includes(c.id)&&styles.courseSelected]}><Text style={styles.courseTitle}>{selected.includes(c.id)?"☑":"□"}  {c.name}</Text><Text style={styles.body}>{c.detail}</Text><Text style={styles.price}>Illustrative fee: R{c.price.toFixed(2)}</Text></Pressable>)}<View style={styles.summary}><Text style={styles.courseTitle}>Your selection</Text><Text>{summary.count} course(s) · {summary.discount}% discount</Text><Text style={styles.total}>Estimated total: R{summary.total.toFixed(2)}</Text></View><Button label="Request a quote" onPress={()=>setPage("Quote")} /></>}
      {page==="Quote" && <><Text style={styles.title}>Request a quotation</Text><Text style={styles.body}>Enter your details. This demo validates locally only.</Text><Text style={styles.label}>Full name *</Text><TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" /><Text style={styles.label}>Email address *</Text><TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="name@example.com" /><Text style={styles.label}>Message</Text><TextInput style={[styles.input,styles.multiline]} value={message} onChangeText={setMessage} multiline placeholder="What would you like to learn?" /><Button label="Validate request" onPress={submit} /><Text style={styles.note}>No information is transmitted or stored by this sample app.</Text></>}
      <Text style={styles.footer}>Pawsitive Pet Academy · Learn · Care · Train</Text>
    </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:"#fff"},header:{paddingHorizontal:22,paddingTop:14,paddingBottom:8},brand:{fontSize:25,fontWeight:"900",color:NAVY},subbrand:{fontSize:10,letterSpacing:3,color:GREEN,fontWeight:"800"},nav:{flexDirection:"row",justifyContent:"space-around",padding:14,backgroundColor:CREAM},navText:{fontWeight:"700",color:NAVY},active:{color:GREEN,textDecorationLine:"underline"},content:{padding:22,paddingBottom:50},eyebrow:{color:GREEN,fontWeight:"800",letterSpacing:1.5,fontSize:11},title:{fontSize:32,fontWeight:"900",color:NAVY,lineHeight:38,marginTop:12,marginBottom:12},body:{fontSize:15,lineHeight:23,color:"#536078",marginBottom:15},tagline:{fontWeight:"800",color:NAVY,marginVertical:18},button:{backgroundColor:GREEN,padding:15,borderRadius:10,alignItems:"center",marginTop:12},buttonText:{color:"#fff",fontWeight:"800"},secondary:{backgroundColor:CREAM},secondaryText:{color:NAVY},course:{padding:17,borderWidth:1,borderColor:"#e0e4e8",borderRadius:13,marginBottom:12},courseSelected:{borderColor:GREEN,backgroundColor:"#f5f9ef"},courseTitle:{fontSize:16,fontWeight:"800",color:NAVY},price:{fontWeight:"800",color:GREEN},summary:{padding:18,backgroundColor:CREAM,borderRadius:12,marginVertical:12},total:{fontWeight:"900",fontSize:18,color:GREEN,marginTop:6},label:{fontWeight:"800",color:NAVY,marginTop:12,marginBottom:5},input:{borderWidth:1,borderColor:"#cbd2dc",borderRadius:8,padding:12,fontSize:15},multiline:{minHeight:100,textAlignVertical:"top"},note:{fontSize:12,color:"#647087",marginTop:12},footer:{textAlign:"center",color:"#647087",fontSize:12,marginTop:35}});
