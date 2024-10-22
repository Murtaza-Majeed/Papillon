import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button, FlatList, NativeEventEmitter, NativeModules, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { GestureHandlerRootView, Swipeable  } from "react-native-gesture-handler";





class Taskdata{
    id: string = "";
    text: string = "";
    title: string = "";
}

export default function ToDoScreen({ navigation }: any) {
    

    const [isInputVisable, setInputVisable] = useState(false); // Används i funktionen addTaskPress

    const [task, setTask] = useState("");                      // UseState variable för task, använders input

    const [tasklist, setTasklist] = useState<Taskdata[]>([]);  // Använder sig av class Taskdata som sedan applicerar använderns input i en flatlist

    const [tasktitle, setTasktitle] = useState("");            // Använders title input

    const [showSwipeButtons, setShowSwipeButtons] = useState<string | null>(null); // Ändras till att få id för den swipeade tasken
    
    const [editingTask, setEditingTask] = useState<string | null>(null); // Håller ID för tasken som ska ändras


    


    function addTaskPress() {
        setInputVisable(!isInputVisable); // Avgör om knappen ska visa "Add" eller "Cancel"
    }


    function addTask() {
        const createid = Date.now();


        if (tasktitle.trim()) {    // Om använderen skriver in onödig "whitespace" eller textfält om whitespaces så tar trim hand om det.
            if(editingTask) {
                setTasklist((prevData) => 
                    prevData.map((item) => 
                        item.id == editingTask ? {...item, text: task, title: tasktitle} : item
                    )
                 )
                 setEditingTask(null);
            } else {
                setTasklist([...tasklist, { id: createid.toString(), text: task, title: tasktitle }]); // Gör en kopia av listan och lägger till använders input
            }            
            setTask("");      // Reset textfältet för task
            
            setTasktitle(""); // Reset textfältet för title
            
            setInputVisable(false); // Om isInputVisable är true, så visar knappen "Cancel", false = "Add"
        }
    };


    // Tar bort en task baserat på id
    function deleteTask(id : string) {
        setTasklist((prevData) => prevData.filter((item) => item.id != id ));
        setShowSwipeButtons(null);
    }

    // Funktion för att ändra en task
    function editTask(id: string) {
        const taskToEdit = tasklist.find((item) => item.id == id);
        if(taskToEdit) {
            setTask(taskToEdit.text);
            setTasktitle(taskToEdit.title);
            setEditingTask(id);
            setInputVisable(true);
        }
    }






    // Funktion som ger alternativ att ta bort en task
    function rightActions(id : string) {
        return (
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => editTask(id)}>
                    <View style={{backgroundColor: "blue", flex: 1, width: 100, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color:"white"}}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(id)}>
                    <View style={{backgroundColor: "red", flex: 1, width: 100, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color:"white"}}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
            );
         }
    

    // Applicerar en swipe funktion på flatlistens tasks
    function renderTasklist({item} : {item: Taskdata}) {
        return (
            <Swipeable
                renderRightActions={() => rightActions(item.id)}
                onSwipeableOpen={() => setShowSwipeButtons(item.id)}
                onSwipeableClose={() => setShowSwipeButtons(null)}
                
            >
                <View style={{borderWidth: 0.2}}>
                    <Text style={{fontSize: 24, paddingLeft: 10, marginBottom: 8}}>{item.title}</Text>
                    <Text style={{paddingLeft: 10}}>{item.text}{"\n"}</Text>
                </View>
            </Swipeable>
            
        );
    }

    



    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{flex: 1}}>
                
                <Button
                    title={isInputVisable ? "Cancel" : "New task"}
                    onPress={addTaskPress}
                /> 

                {isInputVisable && (
                    <View>
                        <View style={{borderWidth: 0.2, borderRadius: 15}}>
                            <TextInput 
                                style={{padding: 5, margin: 5, fontSize: 18}}
                                placeholder="Title"
                                value={tasktitle}
                                onChangeText={(titletext) => setTasktitle(titletext)} />
                            <TextInput
                                style={{padding: 5, margin: 5 }}
                                placeholder="Enter task"
                                value={task}
                                onChangeText={(text) => setTask(text)} />
                        </View>
                        <Button
                            title="Add"
                            onPress={addTask}/>            
                    </View>
                )}

                <FlatList 
                    data={tasklist}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTasklist}
                />

            </SafeAreaView>
        </GestureHandlerRootView>
    );
}


/*
<Button title="Date" onPress={() => setDateOpen(true)}/>
                                <DatePicker
                                    modal
                                    open={dateOpen}
                                    date={taskdate}
                                    onConfirm={(taskdate) => {
                                        setDateOpen(false);
                                        setTaskdate(taskdate);
                                    }}
                                    onCancel={() => {
                                        setDateOpen(false);
                                    }}
                                />
*/