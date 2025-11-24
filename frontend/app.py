import streamlit as st

#set page config early
st.set_page_config(page_title="LLM-Powered Credit Risk Analyzer", layout="wide")

#simple navigation via sidebar
PAGES = ["Home", "Upload", "Dashboard", "Evidence", "What-If", "About"]
page = st.sidebar.radio("Navigate", PAGES)

if page == "Home":
    st.title("LLM-Powered Credit Risk Analyzer")
    st.subheader("Multimodal scoring using numbers + unstructured text")
    st.markdown(
        "A transparent credit intelligence dashboard leveraging LLMs to fuse tabular and text data for explainable risk scoring."
    )
    st.write("Click the button below to start your analysis.")
    if st.button("Start Analysis"):
        st.success("Go to the Upload page via sidebar to begin.")

elif page == "Upload":
    st.header("Data Upload / Applicant Selection")
    st.write("Choose how you'd like to provide applicant data:")
    st.file_uploader("Upload Tabular Data (CSV)", type="csv")
    st.file_uploader("Upload Text Data (TXT)", type="txt")
    if st.button("Analyze Risk"):
        st.info("Risk analysis functionality goes here.")

elif page == "Dashboard":
    st.header("Applicant Risk Score Dashboard")
    st.metric("Overall Risk Score", 63)
    st.markdown("Risk Rating: **Medium**")
    # You can add charts here (e.g., using Plotly, Altair, or Matplotlib)

elif page == "Evidence":
    st.header("Model Explainability & Evidence")
    st.subheader("Feature Importance & Key Evidence")
    st.write("This is where you show SHAP plots and text evidence.")

elif page == "What-If":
    st.header("What-If Simulator")
    st.write("Interactive simulator coming soon!")

elif page == "About":
    st.header("About")
    st.write("""This app demonstrates a transparent, LLM-powered credit risk scoring dashboard.
    Dataset and model info, privacy details and limitations will be described here.
    """)
