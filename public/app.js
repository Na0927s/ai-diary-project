document.addEventListener('DOMContentLoaded', () => {
    const diaryContent = document.getElementById('diary-content');
    const saveDiaryBtn = document.getElementById('save-diary');
    const diariesList = document.getElementById('diaries');
    const sentimentEl = document.getElementById('sentiment');
    const feedbackEl = document.getElementById('feedback');

    const apiUrl = 'http://localhost:3000';

    const fetchDiaries = async () => {
        try {
            const response = await fetch(`${apiUrl}/diaries`);
            const result = await response.json();
            if (result.message === 'success') {
                diariesList.innerHTML = '';
                result.data.forEach(diary => {
                    const li = document.createElement('li');
                    li.textContent = diary.content;
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.addEventListener('click', () => deleteDiary(diary.id));
                    const analyzeBtn = document.createElement('button');
                    analyzeBtn.textContent = 'Analyze';
                    analyzeBtn.addEventListener('click', () => analyzeDiary(diary.id));
                    li.appendChild(deleteBtn);
                    li.appendChild(analyzeBtn);
                    diariesList.appendChild(li);
                });
            }
        } catch (error) {
            console.error('Error fetching diaries:', error);
        }
    };

    const saveDiary = async () => {
        const content = diaryContent.value;
        if (!content) return;

        try {
            const response = await fetch(`${apiUrl}/diaries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            });
            if (response.ok) {
                diaryContent.value = '';
                fetchDiaries();
            }
        } catch (error) {
            console.error('Error saving diary:', error);
        }
    };

    const deleteDiary = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/diaries/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchDiaries();
            }
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
    };

    saveDiaryBtn.addEventListener('click', saveDiary);

    fetchDiaries();
});
