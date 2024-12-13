---
id: terminal
title: Fynix Terminal
sidebar_label: Fynix Terminal
---
1. **Navigating to a Directory**

**Description:** Change the current working directory to a specified folder.

****Natural Language Prompt****

Take me to the 'Documents/Projects' folder.



****Expected Command:****
```
cd ~/Documents/Projects
```



2. **Listing Files in a Directory**

**Description:** Display all files and folders within a specified directory.

****Natural Language Prompt****

Show me everything inside the 'Downloads' folder.



****Expected Command:****

ls ~/Downloads




3. **Viewing the Contents of a File**

Description: Display the contents of a text file in the terminal.

**Natural Language Prompt**

What's inside the 'notes.txt' file?



****Expected Command:****

```
cat notes.txt
```



4. **Copying a File**

Description: Create a duplicate of a file in a specified location.

**Natural Language Prompt**

Make a copy of 'report.docx' in the 'Backup' folder.


**Expected Command:**

```
cp report.docx ~/Backup/
```



5. **Moving a File**

Description: Relocate a file to a different directory.

**Natural Language Prompt**

Move 'photo.jpg' to the 'Pictures/Vacation' folder.



**Expected Command:**

```
mv photo.jpg ~/Pictures/Vacation/
```



6. **Deleting a File**

Description: Remove a specified file from the system.

**Natural Language Prompt**

Delete the 'old_data.csv' file.



**Expected Command:**

```
rm old_data.csv
```



7. **Creating a New Directory**

Description: Make a new folder in a specified location.

**Natural Language Prompt**

Create a new folder named 'Archive' in the 'Documents' directory.



**Expected Command:**

```
mkdir ~/Documents/Archive
```



8. **Checking Disk Usage**

Description: Display the amount of disk space used by files and directories.

**Natural Language Prompt**

How much space is being used in the 'Music' folder?



**Expected Command:**

```
du -sh ~/Music
```



9. **Finding a File by Name**

Description: Search for a file with a specific name within a directory.

**Natural Language Prompt**

Locate a file named 'resume.pdf' in the 'Documents' folder.


**Expected Command:**

```
find ~/Documents -name resume.pdf
```



10. **Viewing Active Network Connections**

Description: Display current network connections and listening ports.

**Natural Language Prompt**

Show me all active network connections.



**Expected Command:**

```
netstat -tuln
```



11. **Finding and Deleting Large Files**

**Natural Language Prompt**

Find and remove all files larger than 100MB in the 'Downloads' folder.



**Generated Command:**

```
find ~/Downloads -type f -size +100M -exec rm -i {} \;
```



Explanation: This command searches for files (-type f) in the ~/Downloads directory that are larger than 100MB (-size +100M) and prompts the user before deleting each one (-exec rm -i {} \;).




12. **Archiving and Compressing a Directory**

**Natural Language Prompt**

Create a compressed archive of the 'Projects' folder and save it as 'projects_backup.tar.gz'.



**Generated Command:**

```
tar -czvf projects_backup.tar.gz -C ~/Projects .
```


Explanation: This command creates a compressed (-czvf) archive named projects_backup.tar.gz of the contents of the ~/Projects directory. The -C option changes to the specified directory before archiving, and the . indicates the current directory's contents.




13. **Recursively Changing File Permissions**

**Natural Language Prompt**

Set all files in the 'Scripts' directory to be executable by the owner.



**Generated Command:**

```
find ~/Scripts -type f -exec chmod u+x {} \;
```


Explanation: This command finds all files (-type f) in the ~/Scripts directory and changes their permissions to make them executable by the owner (chmod u+x).




14. **Monitoring Real-Time System Resource Usage**

**Natural Language Prompt**

Show me real-time CPU and memory usage for all processes.


**Generated Command:**

```
top
```


Explanation: The top command displays real-time information about system resource usage, including CPU and memory usage for all running processes.



15. **Synchronizing Directories Between Two Servers**

**Natural Language Prompt**

Sync the 'Website' folder from the local machine to the remote server 'example.com' in the '/var/www' directory.



**Generated Command:**

```
rsync -avz ~/Website/ user@example.com:/var/www/
```


Explanation: This command synchronizes the local ~/Website/ directory with the /var/www/ directory on the remote server example.com using rsync. The options -avz stand for archive mode, verbose output, and compression during transfer, respectively.



16. **Searching for a Specific Text Pattern in Files**

**Natural Language Prompt**

Find all occurrences of the word 'ERROR' in log files within the '/var/logs' directory.



**Generated Command:**

```
grep -r 'ERROR' /var/logs
```


Explanation: This command recursively (-r) searches for the string 'ERROR' in all files within the /var/logs directory using grep.



17. **Displaying Disk Usage of All Subdirectories**

**Natural Language Prompt**

Show the disk usage of each subdirectory in the 'Documents' folder.



**Generated Command:**

```
du -h --max-depth=1 ~/Documents
```


Explanation: This command displays the disk usage (du) of each subdirectory within the ~/Documents folder, with sizes in human-readable format (-h) and a depth of one level (--max-depth=1).



18. **Scheduling a System Shutdown**

**Natural Language Prompt**

Schedule the system to shut down at 10 PM today.



**Generated Command:**

```
sudo shutdown -h 22:00
```


Explanation: This command schedules a system shutdown (shutdown -h) at 10:00 PM (22:00) today. The sudo command is used to execute the shutdown with superuser privileges.



19. **Counting the Number of Lines in Multiple Files**

**Natural Language Prompt**

Count the total number of lines across all '.txt' files in the 'Notes' directory.



**Generated Command:**

```
cat ~/Notes/*.txt | wc -l
```


Explanation: This command concatenates all .txt files in the ~/Notes directory using cat and pipes the output to wc -l, which counts the total number of lines.



20. **Monitoring Changes to a File in Real-Time**

**Natural Language Prompt**

Show me real-time updates to the 'access.log' file.



**Generated Command:**

```
tail -f access.log
```


Explanation: The tail -f command displays the last part of the access.log file and continues to output new lines as they are added, allowing real-time monitoring.
