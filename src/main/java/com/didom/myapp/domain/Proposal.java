package com.didom.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Proposal.
 */
@Entity
@Table(name = "proposal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "proposal")
public class Proposal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "proposal_time", nullable = false)
    private ZonedDateTime proposalTime;

    @NotNull
    @Column(name = "payment_amount", precision=10, scale=2, nullable = false)
    private BigDecimal paymentAmount;

    @Column(name = "client_grade")
    private Integer clientGrade;

    @Column(name = "client_comment")
    private String clientComment;

    @Column(name = "freelancer_grade")
    private Integer freelancerGrade;

    @Column(name = "freelancer_comment")
    private String freelancerComment;

    @ManyToOne
    private Job job;

    @ManyToOne
    private Freelancer freelancer;

    @ManyToOne
    private PaymentType paymentType;

    @ManyToOne
    private ProposalStatusCatalog currentProposalStatus;

    @OneToMany(mappedBy = "proposal")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contract> contracts = new HashSet<>();

    @OneToMany(mappedBy = "proposal")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Message> messages = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getProposalTime() {
        return proposalTime;
    }

    public Proposal proposalTime(ZonedDateTime proposalTime) {
        this.proposalTime = proposalTime;
        return this;
    }

    public void setProposalTime(ZonedDateTime proposalTime) {
        this.proposalTime = proposalTime;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public Proposal paymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
        return this;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public Integer getClientGrade() {
        return clientGrade;
    }

    public Proposal clientGrade(Integer clientGrade) {
        this.clientGrade = clientGrade;
        return this;
    }

    public void setClientGrade(Integer clientGrade) {
        this.clientGrade = clientGrade;
    }

    public String getClientComment() {
        return clientComment;
    }

    public Proposal clientComment(String clientComment) {
        this.clientComment = clientComment;
        return this;
    }

    public void setClientComment(String clientComment) {
        this.clientComment = clientComment;
    }

    public Integer getFreelancerGrade() {
        return freelancerGrade;
    }

    public Proposal freelancerGrade(Integer freelancerGrade) {
        this.freelancerGrade = freelancerGrade;
        return this;
    }

    public void setFreelancerGrade(Integer freelancerGrade) {
        this.freelancerGrade = freelancerGrade;
    }

    public String getFreelancerComment() {
        return freelancerComment;
    }

    public Proposal freelancerComment(String freelancerComment) {
        this.freelancerComment = freelancerComment;
        return this;
    }

    public void setFreelancerComment(String freelancerComment) {
        this.freelancerComment = freelancerComment;
    }

    public Job getJob() {
        return job;
    }

    public Proposal job(Job job) {
        this.job = job;
        return this;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Freelancer getFreelancer() {
        return freelancer;
    }

    public Proposal freelancer(Freelancer freelancer) {
        this.freelancer = freelancer;
        return this;
    }

    public void setFreelancer(Freelancer freelancer) {
        this.freelancer = freelancer;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public Proposal paymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public ProposalStatusCatalog getCurrentProposalStatus() {
        return currentProposalStatus;
    }

    public Proposal currentProposalStatus(ProposalStatusCatalog proposalStatusCatalog) {
        this.currentProposalStatus = proposalStatusCatalog;
        return this;
    }

    public void setCurrentProposalStatus(ProposalStatusCatalog proposalStatusCatalog) {
        this.currentProposalStatus = proposalStatusCatalog;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public Proposal contracts(Set<Contract> contracts) {
        this.contracts = contracts;
        return this;
    }

    public Proposal addContract(Contract contract) {
        this.contracts.add(contract);
        contract.setProposal(this);
        return this;
    }

    public Proposal removeContract(Contract contract) {
        this.contracts.remove(contract);
        contract.setProposal(null);
        return this;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Proposal messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Proposal addMessage(Message message) {
        this.messages.add(message);
        message.setProposal(this);
        return this;
    }

    public Proposal removeMessage(Message message) {
        this.messages.remove(message);
        message.setProposal(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Proposal proposal = (Proposal) o;
        if (proposal.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, proposal.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Proposal{" +
            "id=" + id +
            ", proposalTime='" + proposalTime + "'" +
            ", paymentAmount='" + paymentAmount + "'" +
            ", clientGrade='" + clientGrade + "'" +
            ", clientComment='" + clientComment + "'" +
            ", freelancerGrade='" + freelancerGrade + "'" +
            ", freelancerComment='" + freelancerComment + "'" +
            '}';
    }
}
