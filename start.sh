pid=$(lsof -tiTCP:3000 | xargs -I {} sudo lsof -p {} | grep node | awk 'NR==1 {print $2}')  
  
# 如果 pid 变量被正确设置，则输出 PID  
if [ -n "$pid" ]; then  
    echo "PID: $pid"  
    kill -9 $pid
else  
    echo "No node process found listening on port 3000"  
fi
node index.js